import { auth } from "@clerk/nextjs/server";
import { CardSignInButton } from "../form/Buttons";
import FavoriteToggleForm from "./FavoriteToggleForm";

type FavoriteToggleButtonProps = {
  productId: string;
  favoriteId: string | null;
};

const FavoriteToggleButton = async ({
  productId,
  favoriteId,
}: FavoriteToggleButtonProps) => {
  const { userId } = await auth();
  if (!userId) return <CardSignInButton />;

  return <FavoriteToggleForm favoriteId={favoriteId} productId={productId} />;
};

export default FavoriteToggleButton;
