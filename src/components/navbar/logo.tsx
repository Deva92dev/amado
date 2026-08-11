import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import logo from "@/assets/Logo.webp";

const Logo = () => {
  return (
    <Button size="icon" asChild>
      <Link href="/" aria-label="Go to homepage">
        <Image
          src={logo}
          alt="Logo of Website"
          width={32}
          height={32}
        />
      </Link>
    </Button>
  );
};

export default Logo;
