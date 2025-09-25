import { Suspense } from "react";
import Link from "next/link";
import Container from "../global/Container";
import CartButton from "./CartButton";
import DarkMode from "./DarkMode";
import LinksDropDown from "./LinksDropDown";
import Logo from "./logo";
import NavSearch from "./NavSearch";
import { publicNavLinks } from "@/utils/links";
import { getOptionalAuth } from "@/lib/clerk/authServer";

const Navbar = async () => {
  const userId = await getOptionalAuth();
  return (
    <nav className="fixed top-0 w-full z-50">
      <Container className="py-5">
        {/* --- Small screens (Mobile & Tablet) --- */}
        <div className="flex flex-row justify-between items-center lg:hidden bg-gradient-glass backdrop-blur-lg border border-border/50 rounded-3xl p-4 shadow-md">
          <DarkMode />
          <Suspense>
            <NavSearch />
          </Suspense>
          <LinksDropDown hidePublicLinks={false} />
        </div>

        {/* --- Big screens (Desktop) --- */}
        <div className="hidden lg:flex flex-row justify-between items-center bg-gradient-glass backdrop-blur-lg border border-border/50 rounded-3xl p-4 gap-4 shadow-md">
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
