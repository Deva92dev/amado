"use client";

import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

type RazorpayButtonProps = {
  orderId: string | null;
  cartId: string | null;
};

const RazorpayButton = ({ cartId, orderId }: RazorpayButtonProps) => {
  const { user } = useUser();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [paymentStatusMessage, setPaymentStatusMessage] = useState("");
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  useEffect(() => {
    const loadRazorpay = async () => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => setRazorpayLoaded(true);
      script.onerror = () => {
        setPaymentStatusMessage(
          "Razorpay SDK failed to load. Please try again later."
        );
        setIsLoading(false);
      };
      document.body.appendChild(script);
    };

    loadRazorpay();

    return () => {
      const script = document.querySelector(
        'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
      );
      if (script) document.body.removeChild(script);
    };
  }, []);

  const handlePayment = async () => {
    if (!razorpayLoaded) {
      setPaymentStatusMessage("Razorpay SDK is still loading. Please wait...");
      return;
    }
    setIsLoading(true);
    setPaymentStatusMessage("Processing Payment...");

    try {
      const response = await axios.post("/api/payment", { orderId, cartId });
      const { order_Id, amount } = response.data;

      if (!order_Id) {
        setPaymentStatusMessage("Error creating payment order.");
        setIsLoading(false);
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        order_id: order_Id,
        amount: amount * 100, // Razorpay already returns amount in paise
        currency: "INR",
        name: "Amado",
        handler: async function (response: any) {
          setPaymentStatusMessage("Verifying Payment...");
          setIsLoading(true);

          try {
            const verifyRes = await axios.post("/api/verify", {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              cartId: cartId,
            });

            if (verifyRes.data.success) {
              setPaymentStatusMessage("Payment Verified! Cart cleared.");
              router.push("/orders");
            } else {
              setPaymentStatusMessage(
                "Payment verification failed. Please contact support."
              );
            }
          } catch (error) {
            setPaymentStatusMessage(
              "Payment verification error. Please try again."
            );
          }
          setIsLoading(false);
        },
        prefill: {
          name: user?.fullName,
          email: user?.emailAddresses[0].emailAddress,
        },
        theme: {
          color: "#3399cc",
        },
      };

      try {
        const rzp1 = new window.Razorpay(options);
        rzp1.on("payment.failed", function () {
          setPaymentStatusMessage("Payment Failed. Please try again.");
          setIsLoading(false);
        });
        rzp1.open();
      } catch {
        setPaymentStatusMessage("Error opening payment widget.");
        setIsLoading(false);
      }
    } catch {
      setPaymentStatusMessage("Failed to initiate payment. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Button
        type="submit"
        size="lg"
        variant="outline"
        onClick={handlePayment}
        disabled={isLoading || !razorpayLoaded}
      >
        {isLoading ? "Processing..." : "Pay with Razorpay"}
      </Button>
      {paymentStatusMessage && <p>{paymentStatusMessage}</p>}
    </div>
  );
};

export default RazorpayButton;
