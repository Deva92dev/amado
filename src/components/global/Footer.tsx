import { footerLinks } from "@/utils/links";
import Logo from "../navbar/logo";
import Container from "./Container";
import Link from "next/link";

function Footer() {
  return (
    <footer className="border-b bg-black">
      <Container className="flex flex-col py-4 justify-between items-center sm:flex-row gap-4">
        <Logo />
        <div className="flex flex-col sm:flex-row gap-4 items-center ">
          {footerLinks.map((link, index) => (
            <div key={index}>
              <Link href={link.url} className="text-white hover:text-gray-300">
                {link.label}
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
