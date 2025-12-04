import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import logo from "@/assets/Logo.png";

const Logo = () => {
  return (
    <Button size="icon" asChild>
      <Link href="/" aria-label="Go to homepage">
        <Image
          src={logo}
          alt="Logo of Website"
          className="bg-blue-400"
          width={32}
          height={32}
        />
      </Link>
    </Button>
  );
};

export default Logo;
