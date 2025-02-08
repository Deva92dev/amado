import { footerLinks } from "@/utils/links";
import Logo from "../navbar/logo";
import Container from "./Container";
import Link from "next/link";

function Footer() {
  return (
    <footer className="border-b bg-slate-700">
      <Container className="flex flex-col sm:flex-row sm:justify-between sm:items-center flex-wrap gap-4 py-8">
        <Logo />
        <div className="flex gap-4 items-center">
          {footerLinks.map((link, index) => (
            <div key={index}>
              <Link href={link.url}>{link.label}</Link>
            </div>
          ))}
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
