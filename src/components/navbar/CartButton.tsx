import Link from "next/link";
import { Button } from "../ui/button";
import { getCartCount } from "../Store/cart-read";
import { getOptionalAuth } from "@/lib/clerk/authServer";
import { ShoppingCart } from "lucide-react";

const CartButton = async () => {
  const userId = await getOptionalAuth();
  const numOfItemsInCart = userId ? await getCartCount(userId) : 0;

  return (
    <Button
      asChild
      variant="outline"
      size="icon"
      className="flex flex-col items-center justify-center relative"
    >
      <Link href="/cart">
        <ShoppingCart />
        <span className="absolute -top-3 -right-3 bg-foreground text-background rounded-full h-6 w-6 flex items-center justify-center text-xs">
          {numOfItemsInCart}
        </span>
      </Link>
    </Button>
  );
};

export default CartButton;
