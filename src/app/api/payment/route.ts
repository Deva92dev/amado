import { NextRequest } from "next/server";
import Razorpay from "razorpay";
import db from "@/utils/db";
import { env } from "../../../../env";

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
    const result = await db.$transaction(async (tx) => {
      const existingOrder = await tx.order.findUnique({
        where: { id: orderId },
      });

      if (!existingOrder) {
        throw new Error("Order not found");
      }
      if (existingOrder.isPaid) {
        throw new Error("Order already paid");
      }

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

      // 3. Calculate total amount
      const orderAmountInPaise = cart.cartItems.reduce((total, item) => {
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

      // 5. Update order with Razorpay ID
      const updatedOrder = await tx.order.update({
        where: { id: orderId },
        data: { razorpayOrderId: razorpayOrder.id },
      });

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
