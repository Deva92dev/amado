import { Suspense } from "react";
import Container from "../global/Container";
import CartButton from "./CartButton";
import DarkMode from "./DarkMode";
import LinksDropDown from "./LinksDropDown";
import Logo from "./logo";
import NavSearch from "./NavSearch";
import { publicNavLinks } from "@/utils/links";
import Link from "next/link";

function Navbar() {
  return (
    <nav className="border-b">
      <Container className="py-8">
        {/* Small screens till lg */}
        <div className="flex flex-row justify-between items-center lg:hidden">
          <DarkMode />
          <Suspense>
            <NavSearch />
          </Suspense>
          <LinksDropDown hidePublicLinks={false} />
        </div>
        {/* Big screens  */}
        <div className="hidden lg:flex flex-row justify-between items-center">
          <Logo />
          <div className="flex flex-row gap-16">
            {publicNavLinks.map((link) => (
              <div key={link.href}>
                <Link href={link.href} className="capitalize w-full">
                  {link.label}
                </Link>
              </div>
            ))}
          </div>
          <div className="flex flex-row gap-4">
            <CartButton />
            <DarkMode />
            <LinksDropDown hidePublicLinks={true} />
          </div>
        </div>
      </Container>
    </nav>
  );
}

export default Navbar;
