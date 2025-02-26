import { fetchCartItems } from "@/utils/actions";
import { Button } from "../ui/button";
import Link from "next/link";
import { LuShoppingCart } from "react-icons/lu";

const CartButton = async () => {
  const numOfItemsInCart = await fetchCartItems();

  return (
    <Button
      asChild
      variant="outline"
      size="icon"
      className="flex flex-col items-center justify-center relative"
    >
      <Link href="/cart">
        <LuShoppingCart />
        <span className="absolute -top-3 -right-3 bg-foreground text-white rounded-full h-6 w-6 flex items-center justify-center text-xs">
          {numOfItemsInCart}
        </span>
      </Link>
    </Button>
  );
};

export default CartButton;
