"use client";
import { CardSignInButton } from "../form/Buttons";
import FavoriteToggleForm from "./FavoriteToggleForm";
import { useAuthUser } from "@/lib/clerk/authClient";

type FavoriteToggleButtonProps = {
  productId: string;
  favoriteId: string | null;
};

const FavoriteToggleButton = ({
  productId,
  favoriteId,
}: FavoriteToggleButtonProps) => {
  const { user } = useAuthUser();
  const userId = user?.id;
  if (!userId) return <CardSignInButton />;

  return <FavoriteToggleForm favoriteId={favoriteId} productId={productId} />;
};

export default FavoriteToggleButton;
