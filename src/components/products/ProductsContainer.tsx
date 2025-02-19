import { fetchAllProducts, fetchFavoriteIdsForProducts } from "@/utils/actions";
import { Button } from "../ui/button";
import Link from "next/link";
import { LuLayoutGrid, LuLayoutList } from "react-icons/lu";
import { Separator } from "../ui/separator";
import ProductsGrid from "./ProductsGrid";
import ProductsList from "./ProductsList";

type ProductContainerProps = {
  layout?: string;
  search?: string;
};

const ProductsContainer = async ({
  layout = "grid",
  search = "",
}: ProductContainerProps) => {
  const products = await fetchAllProducts({ search });
  const productIds = products.map((product) => product.id);
  const favorites = await fetchFavoriteIdsForProducts(productIds);
  // mapping favorites to products
  const productsWithFavorites = products.map((product) => ({
    ...product,
    favoriteId:
      favorites.find((fav) => fav.productId === product.id)?.id || null,
  }));
  const totalProducts = productsWithFavorites.length;
  const searchTerm = search ? `&search=${search}` : "";

  return (
    <>
      {/* header */}
      <section>
        <div className="flex justify-between items-center">
          <h4 className="font-medium text-lg">
            {totalProducts} product{totalProducts > 1 && "s"}
          </h4>
          <div className="flex gap-4">
            <Button
              asChild
              size="icon"
              variant={layout === "grid" ? "default" : "ghost"}
            >
              <Link
                href={`/products?layout=grid${searchTerm}`}
                aria-label="grid-layout"
              >
                <LuLayoutGrid />
              </Link>
            </Button>
            <Button
              asChild
              size="icon"
              variant={layout === "list" ? "default" : "ghost"}
            >
              <Link
                href={`/products?layout=list${searchTerm}`}
                aria-label="list-layout"
              >
                <LuLayoutList />
              </Link>
            </Button>
          </div>
        </div>
        <Separator className="mt-4" />
      </section>
      {/* Products */}
      <div>
        {totalProducts < 0 ? (
          <h5 className="text-2xl mt-12">
            Sorry No products found matched your search...
          </h5>
        ) : layout === "grid" ? (
          <ProductsGrid products={productsWithFavorites} />
        ) : (
          <ProductsList products={productsWithFavorites} />
        )}
      </div>
    </>
  );
};

export default ProductsContainer;
