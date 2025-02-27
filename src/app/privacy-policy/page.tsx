import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy-Policy",
};

const PrivacyPolicy = () => {
  return (
    <div className="flex flex-col flex-grow justify-center items-center">
      <h1 className="capitalize text-3xl font-bold">Privacy Policy</h1>
      <p className="mt-3 text-md bg-muted inline-block p-2">
        Your privacy is important to us, and we are committed to protecting your
        personal information. Our privacy policy explains how we collect, use,
        and safeguard your data. We only use your information for order
        processing, customer service, and improving our website experience. Your
        details will never be shared or sold to third parties without your
        consent. We take strict security measures to ensure your data remains
        confidential and protected.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
