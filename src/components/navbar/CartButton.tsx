"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { ShoppingCart } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { fetchCartCount } from "@/utils/actions";

const CartButton = () => {
  const { isSignedIn, isLoaded } = useUser();
  const [count, setCount] = useState(0);

  // Fetch data ONLY if user is logged in
  useEffect(() => {
    if (isSignedIn) {
      fetchCartCount()
        .then((data) => setCount(data))
        .catch((err) => console.error("Failed to load cart", err));
    }
  }, [isSignedIn]);

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  return (
    <Button
      asChild
      variant="outline"
      size="icon"
      className="flex flex-col items-center justify-center relative transition-opacity duration-300 animate-in fade-in"
    >
      <Link href="/cart">
        <ShoppingCart className="w-5 h-5" />
        {count > 0 && (
          <span className="absolute -top-3 -right-3 bg-foreground text-background rounded-full h-6 w-6 flex items-center justify-center text-xs font-bold border border-background">
            {count}
          </span>
        )}
      </Link>
    </Button>
  );
};

export default CartButton;
