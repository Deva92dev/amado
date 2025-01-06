import { Button } from "../ui/button";
import Link from "next/link";
import { LuShoppingCart } from "react-icons/lu";

const CartButton = async () => {
  const numOfItemsInCart = 5;

  return (
    <Button
      asChild
      variant="outline"
      size="icon"
      className="flex flex-col items-center justify-center relative"
    >
      <Link href="/cart">
        <LuShoppingCart />
        <span className="absolute -top-3 -right-3 bg-primary text-white rounded-full h-6 w-6 flex items-center justify-center text-xs">
          {numOfItemsInCart}
        </span>
      </Link>
    </Button>
  );
};

export default CartButton;
