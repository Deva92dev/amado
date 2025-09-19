type NavLinks = {
  href: string;
  label: string;
};

export const navLinks: NavLinks[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/products", label: "Products" },
  { href: "/favorites", label: "Favorites" },
  { href: "/reviews", label: "reviews" },
  { href: "/cart", label: "Cart" },
  { href: "/orders", label: "Orders" },
  { href: "/admin/sales", label: "dashboard" },
];

export const publicNavLinks: NavLinks[] = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
];

export const adminLinks: NavLinks[] = [
  { href: "/admin/sales", label: "sales" },
  { href: "/admin/products", label: "my products" },
  { href: "/admin/products/create", label: "create product" },
  { href: "/admin/upload-video", label: "Upload Video" },
];

export const footerLinks = [
  {
    url: "/contact",
    label: "Contact Us",
  },
  {
    url: "/privacy-policy",
    label: "Privacy-Policy",
  },
  {
    url: "/shipping-policy",
    label: "Returns and Shipping Policy",
  },
  {
    url: "/terms-condition",
    label: "Terms and Condition",
  },
  {
    url: "/cancellation-refunds",
    label: "Cancellation And Refunds",
  },
];
