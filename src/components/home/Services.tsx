import { Package, Shield, Truck } from "lucide-react";
import { Separator } from "../ui/separator";

const servicesLinks = [
  {
    icon: <Truck />,
    label: "Free Shipping Method",
    details:
      "Enjoy the ease and savings of our free shipping method. We deliver your purchases directly to your doorstep, eliminating any additional shipping fees.",
  },
  {
    icon: <Shield />,
    label: "Secure Payment System",
    details:
      "Your financial security is our top priority. Our secure payment system employs advanced encryption technologies to protect your sensitive payment information. ",
  },
  {
    icon: <Package />,
    label: "Cash On Delivery",
    details:
      "For added convenience and flexibility, we offer a cash on delivery option. Pay for your order upon arrival, directly to the delivery agent. ",
  },
];

const Services = () => {
  return (
    <section className="rounded-lg pt-24">
      <h2 className="capitalize mb-8 tracking-wider font-medium text-3xl text-start">
        Our Services
      </h2>
      <Separator className="my-8" />
      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {servicesLinks.map((link) => (
          <div
            key={link.label}
            className="p-6 bg-secondary text-secondary-foreground rounded-lg hover:bg-accent hover:text-accent-foreground transition-shadow hover:shadow-lg"
          >
            <div className="rounded-lg p-3 bg-primary w-max">
              <p className="text-primary-foreground text-2xl">{link.icon}</p>
            </div>
            <h4 className="font-semibold my-4 font-serif">{link.label}</h4>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {link.details}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
