"use client";
import { useUser } from "@clerk/nextjs";
import { CardSignInButton } from "../form/Buttons";
import FavoriteToggleForm from "./FavoriteToggleForm";

type FavoriteToggleButtonProps = {
  productId: string;
  favoriteId: string | null;
};

const FavoriteToggleButton = ({
  productId,
  favoriteId,
}: FavoriteToggleButtonProps) => {
  const { user } = useUser();
  const userId = user?.id;
  if (!userId) return <CardSignInButton />;

  return <FavoriteToggleForm favoriteId={favoriteId} productId={productId} />;
};

export default FavoriteToggleButton;
