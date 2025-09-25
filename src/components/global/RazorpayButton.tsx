"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "../ui/button";
import { useAuthUser } from "@/lib/clerk/authClient";
import { toast } from "@/hooks/use-toast";

type RazorpayButtonProps = {
  orderId: string | null;
  cartId: string | null;
};
interface PaymentResponse {
  order_Id: string;
  amount: number;
}
interface VerificationResponse {
  success: boolean;
  message?: string;
}

const RazorpayButton = ({ cartId, orderId }: RazorpayButtonProps) => {
  const { user } = useAuthUser();
  const router = useRouter();
  const queryClient = useQueryClient();

  const [isLoading, setIsLoading] = useState(false);
  const [paymentStatusMessage, setPaymentStatusMessage] = useState("");
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  const createPayment = useMutation<
    PaymentResponse,
    Error,
    { orderId: string | null; cartId: string | null }
  >({
    mutationFn: async ({ orderId, cartId }) => {
      const response = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, cartId }),
      });

      if (!response.ok) {
        throw new Error("Failed to create payment order");
      }

      return response.json();
    },
    onError: (error: any) => {
      toast({ description: `Payment initialization failed: ${error.message}` });
    },
  });

  const verifyPayment = useMutation<VerificationResponse, Error, any>({
    mutationFn: async (paymentData) => {
      const response = await fetch("/api/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...paymentData,
          cartId,
        }),
      });
      if (!response.ok) {
        throw new Error("Payment verification failed");
      }
      return response.json();
    },
    onSuccess: (data) => {
      if (data.success) {
        // Invalidate relevant queries after successful payment
        queryClient.invalidateQueries({ queryKey: ["cart"] });
        queryClient.invalidateQueries({ queryKey: ["orders"] });
        queryClient.invalidateQueries({ queryKey: ["user-orders"] });

        toast({ description: "Payment verified successfully!" });
        router.push("/orders");
      } else {
        toast({
          description: "Payment verification failed. Please contact support.",
        });
      }
    },
    onError: (error) => {
      toast({ description: `Verification failed: ${error.message}` });
    },
  });

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
      toast({ description: "Razorpay SDK is still loading. Please wait..." });
      return;
    }

    try {
      const paymentData = await createPayment.mutateAsync({
        orderId,
        cartId,
      });

      const { order_Id, amount } = paymentData;

      if (!order_Id) {
        toast({ description: "Error creating payment order." });
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        order_id: order_Id,
        amount: amount * 100,
        currency: "INR",
        name: "Amado",
        handler: async function (response: any) {
          await verifyPayment.mutateAsync({
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          });
        },
        prefill: {
          name: user?.fullName,
          email: user?.emailAddresses[0].emailAddress,
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp1 = new (window as any).Razorpay(options);

      rzp1.on("payment.failed", function () {
        toast({ description: "Payment failed. Please try again." });
      });

      rzp1.open();
    } catch (error) {
      console.error("Payment error:", error);
    }
  };

  // loading states
  const isProcessing = createPayment.isPending || verifyPayment.isPending;
  const isDisabled = !razorpayLoaded || isProcessing || !orderId || !cartId;

  return (
    <div className="space-y-2">
      <Button
        type="button"
        size="lg"
        variant="outline"
        onClick={handlePayment}
        disabled={isDisabled}
        className="w-full"
      >
        {createPayment.isPending && "Initializing Payment..."}
        {verifyPayment.isPending && "Verifying Payment..."}
        {!isProcessing && !razorpayLoaded && "Loading Payment Gateway..."}
        {!isProcessing && razorpayLoaded && "Pay with Razorpay"}
      </Button>
      {createPayment.isError && (
        <p className="text-sm text-red-500">
          Failed to initialize payment. Please try again.
        </p>
      )}
      {verifyPayment.isError && (
        <p className="text-sm text-red-500">
          Payment verification failed. Please contact support if payment was
          deducted.
        </p>
      )}
      {verifyPayment.isSuccess && (
        <p className="text-sm text-green-500">
          Payment successful! Redirecting to orders...
        </p>
      )}
    </div>
  );
};

export default RazorpayButton;
