import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
};

const Contact = () => {
  return (
    <div className="flex flex-col flex-grow justify-center items-center">
      <h1 className="capitalize text-3xl font-bold">Contact Us</h1>
      <p className="mt-3 text-md bg-muted inline-block p-2">
        We’re here to help! If you have any questions about our products,
        orders, or policies, feel free to reach out to us. You can contact us
        via email, phone, or by filling out our online inquiry form. Our support
        team is available to assist you during business hours and will get back
        to you as soon as possible. We value your feedback and strive to provide
        the best customer experience. Your satisfaction is our top priority!
      </p>
    </div>
  );
};

export default Contact;
