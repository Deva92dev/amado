import SectionTitle from "@/components/global/SectionTitle";
import ProductsGrid from "@/components/products/ProductsGrid";
import { fetchUserFavorites } from "@/utils/actions";
import { currentUser } from "@clerk/nextjs/server";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Favorites",
};

const FavoritesPage = async () => {
  const user = await currentUser();
  const userId = user?.id;
  const favorites = await fetchUserFavorites(userId as string);

  if (favorites.length === 0) {
    return <SectionTitle text="You have no favorites yet" />;
  }

  const products = favorites.map((fav) => ({
    id: fav.product.id,
    name: fav.product.name,
    price: fav.product.price,
    image: fav.product.image,
    type: fav.product.type,
    colors: fav.product.colors ?? [],
    sizes: fav.product.sizes ?? [],
    favoriteIds: [fav.id],
  }));

  return (
    <section className="relative overflow-hidden py-24 px-12">
      <SectionTitle text="Favorites" />
      <ProductsGrid products={products} />
    </section>
  );
};

export default FavoritesPage;
