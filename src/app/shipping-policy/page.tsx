import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shipping-Policy",
};

const ShippingPolicy = () => {
  return (
    <div className="flex flex-col flex-grow justify-center items-center">
      <h1 className="capitalize text-3xl font-bold">Shipping Policy</h1>
      <p className="mt-3 text-md bg-muted inline-block p-2">
        We offer reliable and timely shipping to ensure your orders reach you as
        quickly as possible. Shipping timelines and costs vary based on your
        location and the shipping method selected. Once your order is
        dispatched, you will receive a tracking number for real-time updates. In
        case of delays, we will keep you informed and work towards a resolution.
        Our goal is to provide a smooth and hassle-free delivery experience.
      </p>
    </div>
  );
};

export default ShippingPolicy;
