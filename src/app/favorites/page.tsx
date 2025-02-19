import SectionTitle from "@/components/global/SectionTitle";
import ProductsGrid from "@/components/products/ProductsGrid";
import { fetchUserFavorites } from "@/utils/actions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Favorites",
};

const FavoritesPage = async () => {
  const favorites = await fetchUserFavorites();
  const products = favorites.map((fav) => ({
    ...fav.product,
    favoriteId: fav.id,
  }));
  if (favorites.length === 0)
    return <SectionTitle text="You have no favorites yet" />;

  return (
    <div>
      <SectionTitle text="Favorites" />
      <ProductsGrid products={products} />
    </div>
  );
};

export default FavoritesPage;
