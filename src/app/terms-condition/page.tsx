import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions",
};

const Terms = () => {
  return (
    <div className="flex flex-col flex-grow justify-center items-center">
      <h1 className="capitalize text-3xl font-bold">Terms & COnditions</h1>
      <p className="mt-3 text-md bg-muted inline-block p-2">
        By using our website, you agree to abide by our terms and conditions.
        These terms govern the use of our services, purchases, and interactions
        with our platform. It includes details about payment, order processing,
        and limitations of liability. We encourage you to review these terms
        carefully before making a purchase. Continued use of our website
        signifies your acceptance of these terms.
      </p>
    </div>
  );
};

export default Terms;
