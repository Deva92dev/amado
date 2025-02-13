import { NextRequest } from "next/server";
import crypto from "crypto";
import db from "@/utils/db";
import { PaymentStatus } from "@prisma/client";

export const POST = async (req: NextRequest) => {
  console.log("Webhook endpoint /api/razorpay-webhook/route.ts was hit!");
  try {
    const body = await req.text();
    const signatures = req.headers.get("x-razorpay-signature");
    if (!signatures) {
      return Response.json({ error: "Missing signature" }, { status: 400 });
    }

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!)
      .update(body)
      .digest("hex");
    if (expectedSignature !== signatures) {
      return Response.json({ error: "Invalid signature" }, { status: 400 });
    }

    const event = JSON.parse(body);

    if (event.event === "payment.captured") {
      const payment = event.payload.payment.entity;
      const razorpayOrderId = payment.order_id;
      const razorpayPaymentId = payment.id;
      const orderNotes = payment.notes;
      const cartIdFromNotes = orderNotes?.cartId;

      if (!razorpayOrderId || !razorpayPaymentId) {
        console.error("Webhook payload missing order_id or payment_id:", event);
        return Response.json(
          { error: "Webhook payload invalid: missing order or payment ID" },
          { status: 400 }
        );
      }

      try {
        const existingOrder = await db.order.findUnique({
          where: {
            razorpayOrderId: razorpayOrderId,
          },
        });

        if (!existingOrder) {
          console.error(
            "Order not found in database for Razorpay Order ID:",
            razorpayOrderId
          );
          return Response.json(
            { error: "Order not found in database" },
            { status: 404 }
          );
        }

        const updatedOrder = await db.order.update({
          where: {
            id: existingOrder.id,
          },
          data: {
            razorpayPaymentId: razorpayPaymentId,
            isPaid: true,
            paymentStatus: PaymentStatus.COMPLETED,
          },
        });

        if (!updatedOrder) {
          console.error(
            "Failed to update Order in database after payment capture. Razorpay Order ID:",
            razorpayOrderId
          );
          return Response.json(
            { error: "Failed to update order status in database" },
            { status: 500 }
          );
        }

        // delete cart after successful payment
        if (cartIdFromNotes) {
          console.log(
            "Webhook: Attempting to delete cart with cartId:",
            cartIdFromNotes
          );
          try {
            await db.cart.delete({
              where: { id: cartIdFromNotes },
            });
            console.log(
              `Webhook: Cart and associated CartItems deleted for cartId: ${cartIdFromNotes}`
            );
          } catch (cartDeleteError) {
            console.error(
              "Webhook: Error deleting cart in database:",
              cartDeleteError
            );
          }
        } else {
          console.warn(
            "Webhook: No cartId found in payment notes, skipping cart deletion."
          );
        }
      } catch (error) {
        console.error("Database error during webhook processing:", error);
        return Response.json(
          { error: "Database update failed during webhook processing" },
          { status: 500 }
        );
      }
    }

    return Response.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error("Webhook error handler exception:", error);
    return Response.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
};
