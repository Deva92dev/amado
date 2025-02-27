import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cancellation Policy",
};

const CancellationPolicy = () => {
  return (
    <div className="flex flex-col flex-grow justify-center items-center">
      <h1 className="capitalize text-3xl font-bold">Refunds & Cancellation</h1>
      <p className="mt-3 text-md bg-muted inline-block p-2">
        We understand that sometimes plans change, and you may need to cancel an
        order or request a refund. Cancellations are accepted within a limited
        time after placing an order. If your product is eligible for a refund,
        we will process it as per our return guidelines. Refunds will be issued
        to the original payment method within the stipulated time frame. We aim
        to make our return and cancellation process seamless for your
        convenience.
      </p>
    </div>
  );
};

export default CancellationPolicy;
