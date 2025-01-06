/* eslint-disable @typescript-eslint/no-unused-vars */
import { FaHeart } from "react-icons/fa";
import { Button } from "../ui/button";

type FavoriteToggleButtonProps = {
  productId: string;
};

const FavoriteToggleButton = ({ productId }: FavoriteToggleButtonProps) => {
  return (
    <Button size="icon" variant="outline" className="p-2 cursor-pointer">
      <FaHeart />
    </Button>
  );
};

export default FavoriteToggleButton;
