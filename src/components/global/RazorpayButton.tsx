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
      script.onload = () => {
        setRazorpayLoaded(true);
      };
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
      // Cleanup script if component unmounts (optional but good practice)
      const script = document.querySelector(
        'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
      );
      if (script) {
        document.body.removeChild(script);
      }
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
      const response = await axios.post("/api/payment", {
        orderId: orderId,
        cartId: cartId,
      });

      const razorpayOrderId = response.data.order_Id;
      const responseAmount = response.data.amount;
      if (razorpayOrderId) {
        const options = {
          key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
          order_Id: razorpayOrderId,
          amount: responseAmount * 100,
          currency: "INR",
          name: "Amado",
          handler: async function (response: any) {
            setPaymentStatusMessage(
              "Payment is Successful! Order is being Processed"
            );
            setIsLoading(false);
            router.push("/"); // send to home page
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
          rzp1.on("payment.failed", function (error: any) {
            setPaymentStatusMessage("Payment Failed. Please try again.");
            setIsLoading(false);
          });
          rzp1.open();
        } catch (sdkError: any) {
          setPaymentStatusMessage("Error opening payment widget.");
          setIsLoading(false);
        }
      } else {
        setPaymentStatusMessage("Error creating payment order.");
        setIsLoading(false);
      }
    } catch (error) {
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
