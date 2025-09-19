import { auth } from "@clerk/nextjs/server";
import { Suspense } from "react";
import Link from "next/link";
import Container from "../global/Container";
import CartButton from "./CartButton";
import DarkMode from "./DarkMode";
import LinksDropDown from "./LinksDropDown";
import Logo from "./logo";
import NavSearch from "./NavSearch";
import { publicNavLinks } from "@/utils/links";

const Navbar = async () => {
  const { userId } = await auth();
  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-lg border-b border-border/50 shadow-sm">
      <Container className="py-5">
        {/* --- Small screens (Mobile & Tablet) --- */}
        <div className="flex flex-row justify-between items-center lg:hidden">
          <DarkMode />
          <Suspense>
            <NavSearch />
          </Suspense>
          <LinksDropDown hidePublicLinks={false} />
        </div>
        {/* --- Big screens (Desktop) --- */}
        <div className="hidden lg:flex flex-row justify-between items-center border border-border rounded-3xl p-4 gap-4 bg-card shadow-md">
          <Logo />
          <ul className="flex flex-row gap-12 font-secondary-sans">
            {publicNavLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="capitalize w-full magnetic-hover glow-text transition-all duration-300 text-[color:var(--primary)] hover:text-[color:var(--brand-accent)]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex flex-row gap-4 items-center">
            {userId && <CartButton />}
            <DarkMode />
            <LinksDropDown hidePublicLinks={true} />
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
