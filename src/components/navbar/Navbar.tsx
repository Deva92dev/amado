import { Suspense } from "react";
import Link from "next/link";
import Container from "../global/Container";
import CartButton from "./CartButton";
import DarkMode from "./DarkMode";
import LinksDropDown from "./LinksDropDown";
import Logo from "./logo";
import { publicNavLinks } from "@/utils/links";
import { getOptionalAuth } from "@/lib/clerk/authServer";
import SearchBar from "../products/SearchBar";

const Navbar = async () => {
  const userId = await getOptionalAuth();
  return (
    <nav
      className="fixed top-0 w-full z-50"
      style={{
        background: "rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      <Container className="py-5">
        {/* Mobile & Tablet */}
        <div className="flex flex-row justify-between items-center lg:hidden bg-gradient-glass backdrop-blur-lg border border-border/50 rounded-3xl p-4 shadow-md">
          <DarkMode />
          <Suspense>
            <div className="flex-1 mx-4 max-w-xs">
              <SearchBar showSuggestions={true} />
            </div>
          </Suspense>
          <LinksDropDown hidePublicLinks={false} />
        </div>
        {/* Desktop*/}
        <div className="hidden lg:flex flex-row justify-between items-center bg-gradient-glass backdrop-blur-lg border border-border/50 rounded-3xl p-4 gap-4 shadow-md">
          <Logo />
          <ul className="flex flex-row gap-8 font-secondary-sans">
            {publicNavLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="capitalize w-full magnetic-hover glow-text transition-all duration-300 nav-link-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex-1 max-w-sm mx-4">
            <Suspense>
              <SearchBar showSuggestions={true} />
            </Suspense>
          </div>
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
