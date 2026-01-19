import { NextRequest } from "next/server";
import Razorpay from "razorpay";
import { env } from "../../../../env";
import { db } from "@/db";
import { order, cart } from "@/db/schema";
import { eq } from "drizzle-orm";

const razorpay = new Razorpay({
  key_id: env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  key_secret: env.RAZORPAY_KEY_SECRET,
});

export const POST = async (req: NextRequest) => {
  try {
    const { orderId, cartId } = await req.json();

    if (!orderId || !cartId) {
      return Response.json(
        { success: false, message: "Missing orderId or cartId" },
        { status: 400 }
      );
    }

    // Transaction for atomic operations
    const result = await db.transaction(async (tx) => {
      // Fetch Existing Order
      const existingOrder = await tx.query.order.findFirst({
        where: eq(order.id, orderId),
        columns: { isPaid: true }, // Optimization: only select what we need to check
      });

      if (!existingOrder) {
        throw new Error("Order not found");
      }
      if (existingOrder.isPaid) {
        throw new Error("Order already paid");
      }

      // Fetch Cart with Nested Relations (Items -> Product)
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

      // Calculate total amount
      const orderAmountInPaise = userCart.cartItems.reduce((total, item) => {
        return total + item.product.price * 100 * item.amount;
      }, 0);

      if (orderAmountInPaise <= 0) {
        throw new Error("Invalid order amount");
      }

      // Create Razorpay order
      const razorpayOrder = await razorpay.orders.create({
        amount: orderAmountInPaise,
        currency: "INR",
        receipt: `receipt_${orderId.slice(-6)}`,
        notes: {
          orderId: orderId,
          cartId: cartId,
        },
      });

      if (!razorpayOrder?.id) {
        throw new Error("Failed to create Razorpay order");
      }

      // Update order with Razorpay ID
      await tx
        .update(order)
        .set({ razorpayOrderId: razorpayOrder.id })
        .where(eq(order.id, orderId));

      return {
        razorpayOrderId: razorpayOrder.id,
        amount: razorpayOrder.amount,
      };
    });

    return Response.json({
      success: true,
      order_Id: result.razorpayOrderId,
      amount: result.amount,
    });
  } catch (error: any) {
    console.error("Payment initialization error:", error);
    return Response.json(
      {
        success: false,
        message: error.message || "Payment processing failed",
        error: process.env.NODE_ENV === "development" ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
};
