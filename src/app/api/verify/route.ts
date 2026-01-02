import { NextRequest, NextResponse } from "next/server";
import crypto, { randomUUID } from "crypto";
import Razorpay from "razorpay";
import { revalidatePath } from "next/cache";
import { env } from "../../../../env";
import { db } from "@/db";
import { order, cart, cartItem, orderItem } from "@/db/schema";
import { eq } from "drizzle-orm";

const razorpay = new Razorpay({
  key_id: env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  key_secret: env.RAZORPAY_KEY_SECRET,
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
      .createHmac("sha256", env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generated_signature !== razorpay_signature) {
      return NextResponse.json(
        { success: false, message: "Invalid Signature" },
        { status: 400 }
      );
    }

    const result = await db.transaction(async (tx) => {
      const razorpayOrder = await razorpay.orders.fetch(razorpay_order_id);

      const notes = razorpayOrder.notes as Record<string, string> | undefined;
      if (!notes || !notes.cartId) {
        throw new Error("Cart ID missing in payment notes");
      }

      const cartId = notes.cartId;

      // Get cart with items & products
      const userCart = await tx.query.cart.findFirst({
        where: eq(cart.id, cartId),
        with: {
          cartItems: {
            with: {
              product: true,
            },
          },
        },
      });

      if (!userCart) throw new Error("Cart not found");
      if (!userCart.cartItems || userCart.cartItems.length === 0) {
        throw new Error("Empty cart");
      }

      // Update order status
      // 'returning()' to get the updated order ID for the next step
      const [updatedOrder] = await tx
        .update(order)
        .set({
          razorpayPaymentId: razorpay_payment_id,
          paymentStatus: "COMPLETED",
          isPaid: true,
        })
        .where(eq(order.razorpayOrderId, razorpay_order_id))
        .returning();

      if (!updatedOrder) {
        throw new Error("Order not found matching this Razorpay ID");
      }

      // Create order items from cart (Bulk Insert)
      // Drizzle insert takes an array for bulk operations
      await tx.insert(orderItem).values(
        userCart.cartItems.map((item) => ({
          id: randomUUID(),
          productId: item.productId,
          orderId: updatedOrder.id,
          quantity: item.amount,
          price: item.product.price,
        }))
      );

      // Cleanup cart
      // Delete items first (FK constraints), then the cart
      await tx.delete(cartItem).where(eq(cartItem.cartId, cartId));
      await tx.delete(cart).where(eq(cart.id, cartId));

      return updatedOrder;
    });

    revalidatePath("/");
    revalidatePath("/cart");
    revalidatePath("/orders");
    // Only revalidate if successfully got an ID
    if (result?.id) {
      revalidatePath(`/products/${result.id}`);
    }

    return NextResponse.json({
      success: true,
      message: "Payment Verified & Cart Cleared",
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
