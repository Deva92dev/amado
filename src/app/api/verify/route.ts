import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import db from "@/utils/db";
import Razorpay from "razorpay";
import { revalidatePath } from "next/cache";

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: NextRequest) {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
      await req.json();

    // Validate input
    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
      return NextResponse.json(
        { success: false, message: "Missing payment details" },
        { status: 400 }
      );
    }

    // Verify signature
    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generated_signature !== razorpay_signature) {
      return NextResponse.json(
        { success: false, message: "Invalid Signature" },
        { status: 400 }
      );
    }

    const result = await db.$transaction(async (tx) => {
      // 1. Get Razorpay order details
      const razorpayOrder = await razorpay.orders.fetch(razorpay_order_id);

      const notes = razorpayOrder.notes as Record<string, string> | undefined;
      if (!notes || !notes.cartId) {
        throw new Error("Cart ID missing in payment notes");
      }

      // 2. Validate cart ID from Razorpay notes
      const cartId = notes.cartId;
      if (typeof cartId !== "string") {
        throw new Error("Invalid cart ID format");
      }

      // 3. Get cart with items
      const cart = await tx.cart.findUnique({
        where: { id: cartId },
        include: {
          cartItems: {
            include: {
              product: true,
            },
          },
        },
      });

      if (!cart) throw new Error("Cart not found");
      if (!cart.cartItems?.length) throw new Error("Empty cart");

      // 4. Update order status
      const updatedOrder = await tx.order.update({
        where: { razorpayOrderId: razorpay_order_id },
        data: {
          razorpayPaymentId: razorpay_payment_id,
          paymentStatus: "COMPLETED",
          isPaid: true,
        },
      });

      // 5. Create order items from cart
      await tx.orderItem.createMany({
        data: cart.cartItems.map((item) => ({
          productId: item.productId,
          orderId: updatedOrder.id,
          quantity: item.amount,
          price: item.product.price,
        })),
      });

      // 6. Cleanup cart
      await tx.cartItem.deleteMany({ where: { cartId } });
      await tx.cart.delete({ where: { id: cartId } });

      return updatedOrder;
    });

    // Revalidate paths
    revalidatePath("/");
    revalidatePath("/cart");
    revalidatePath("/orders");
    revalidatePath(`/products/${result.id}`);

    return NextResponse.json({
      success: true,
      message: "Payment Verified & Cart Cleared",
      // orderId: result.id,
    });
  } catch (error: any) {
    console.error("Payment verification error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Server Error",
        error: process.env.NODE_ENV === "development" ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}
