"use client";

import RazorpayButton from "@/components/global/RazorpayButton";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const CheckoutContent = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const cartId = searchParams.get("cartId");

  return (
    <div id="checkout">
      <h1>Checkout</h1>
      <p>Order ID: {orderId}</p>
      <p>Cart ID: {cartId}</p>
      <RazorpayButton orderId={orderId} cartId={cartId} />
    </div>
  );
};

const CheckoutPage = () => {
  return (
    <Suspense fallback={<div>Loading checkout details...</div>}>
      <CheckoutContent />
    </Suspense>
  );
};

export default CheckoutPage;
