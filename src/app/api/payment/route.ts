import { NextRequest } from "next/server";
import Razorpay from "razorpay";
import db from "@/utils/db";

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export const POST = async (req: NextRequest) => {
  const requestHeaders = new Headers(req.headers);
  const origin = requestHeaders.get("origin");

  const { orderId, cartId } = await req.json();
  console.log("Received orderId:", orderId, "cartId:", cartId);
  const existingOrder = await db.order.findUnique({
    where: {
      id: orderId,
    },
  });

  const cart = await db.cart.findUnique({
    where: {
      id: cartId,
    },
    include: {
      cartItems: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!existingOrder || !cart) {
    return Response.json(null, {
      status: 404,
      statusText: "Order or cart Not Found",
    });
  }

  if (existingOrder.isPaid) {
    return Response.json({ error: "Order already paid." }, { status: 400 });
  }

  // Calculate total amount from cartItems
  let orderAmountInPaise = 0;
  cart.cartItems.map((cartItem) => {
    orderAmountInPaise += cartItem.product.price * 100 * cartItem.amount;
  });
  if (orderAmountInPaise <= 0) {
    console.error(
      "Error: Order Amount is invalid, Amount in paise:",
      orderAmountInPaise,
      "OrderID:",
      orderId
    );
    return Response.json({ error: "Order Amount is invalid" }, { status: 400 });
  }

  try {
    const razorpayOrder = await razorpay.orders.create({
      amount: orderAmountInPaise,
      currency: "INR",
      receipt: `receipt_order_${orderId.slice(-6)}`,
      notes: {
        orderId: orderId,
        cartId: cartId,
      },
    });

    if (!razorpayOrder || !razorpayOrder.id) {
      return Response.json(
        { error: "Failed to create Razorpay order" },
        { status: 500 }
      );
    }

    // UPDATE existing Order with razorpayOrderId
    const updatedOrder = await db.order.update({
      where: {
        id: orderId,
      },
      data: {
        razorpayOrderId: razorpayOrder.id,
      },
    });

    if (!updatedOrder) {
      return Response.json(
        {
          error: "Payment gateway order created, but database update failed.",
        },
        { status: 500 }
      );
    }

    return Response.json({
      order_Id: razorpayOrder.id,
      amount: razorpayOrder.amount,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    return Response.json(
      { error: "Internal Server Error: Razorpay payment gateway error" },
      { status: 500 }
    );
  }
};
