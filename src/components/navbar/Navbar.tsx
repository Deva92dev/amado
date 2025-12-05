import { Suspense } from "react";
import Link from "next/link";
import Container from "../global/Container";
import DarkMode from "./DarkMode";
import Logo from "./logo";
import { publicNavLinks } from "@/utils/links";
import dynamic from "next/dynamic";

const CartButton = dynamic(() => import("./CartButton"), { ssr: true });
const LinksDropDown = dynamic(() => import("./LinksDropDown"), { ssr: true });
const SearchBar = dynamic(() => import("../products/SearchBar"), { ssr: true });

const styles = {
  nav: "fixed top-0 w-full z-50 transition-all duration-300",
  mobileWrapper:
    "flex flex-row justify-between items-center lg:hidden " +
    "bg-white/80 dark:bg-black/80 backdrop-blur-none border border-white/20 dark:border-white/10 " +
    "rounded-2xl p-3 shadow-sm",
  desktopWrapper:
    "hidden lg:flex flex-row justify-between items-center " +
    "bg-white/70 dark:bg-black/60 backdrop-blur-md border border-white/20 dark:border-white/10 " +
    "rounded-3xl p-4 gap-6 shadow-sm hover:shadow-md transition-shadow",
};

const DesktopNavLinks = () => (
  <ul className="flex flex-row gap-8 font-secondary-sans">
    {publicNavLinks.map((link) => (
      <li key={link.href}>
        <Link
          href={link.href}
          className="capitalize text-sm font-bold tracking-wide 
            text-gray-800 dark:text-gray-200 hover:text-[hsl(215_100%_40%)] 
            transition-colors duration-200"
        >
          {link.label}
        </Link>
      </li>
    ))}
  </ul>
);

const Navbar = () => {
  return (
    <nav className={styles.nav}>
      <Container className="py-4 md:py-5">
        {/* --- Mobile View --- */}
        <div className={styles.mobileWrapper}>
          <DarkMode />
          <Suspense>
            <div className="flex-1 mx-2 max-w-[200px]">
              <SearchBar showSuggestions={false} />
            </div>
          </Suspense>
          <LinksDropDown hidePublicLinks={false} />
        </div>
        {/*  Desktop View */}
        <div className={styles.desktopWrapper}>
          <Logo />
          <DesktopNavLinks />

          <div className="flex-1 max-w-sm">
            <Suspense>
              <SearchBar showSuggestions={true} />
            </Suspense>
          </div>

          <div className="flex flex-row gap-4 items-center">
            <CartButton />
            <DarkMode />
            <LinksDropDown hidePublicLinks={true} />
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
