import { fetchAllProducts, fetchFavoriteIdsForProducts } from "@/utils/actions";
import { Button } from "../ui/button";
import Link from "next/link";
import { LuLayoutGrid, LuLayoutList } from "react-icons/lu";
import { Separator } from "../ui/separator";
import ProductsGrid from "./ProductsGrid";
import ProductsList from "./ProductsList";
import { SortOption } from "@/app/products/page";

type ProductContainerProps = {
  layout?: string;
  search?: string;
  category?: string;
  sortBy?: SortOption;
};

const ProductsContainer = async ({
  layout = "grid",
  search = "",
  category = "all",
  sortBy = "name-a-z",
}: ProductContainerProps) => {
  const products = await fetchAllProducts({ search, category });
  const productIds = products.map((product) => product.id);
  const favorites = await fetchFavoriteIdsForProducts(productIds);
  // mapping favorites to products
  let productsWithFavorites = products.map((product) => ({
    ...product,
    favoriteId:
      favorites.find((fav) => fav.productId === product.id)?.id || null,
  }));

  productsWithFavorites = sortProducts(productsWithFavorites, sortBy);
  const totalProducts = productsWithFavorites.length;

  const createUrl = (newParams: Record<string, string>) => {
    const params = new URLSearchParams();

    // Add existing params
    if (search) params.set("search", search);
    if (category !== "all") params.set("category", category);
    if (sortBy) params.set("sortBy", sortBy);

    // Override with new params
    Object.entries(newParams).forEach(([key, value]) => {
      params.set(key, value);
    });

    return `/products?${params.toString()}`;
  };

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
                href={createUrl({ layout: "grid" })}
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
                href={createUrl({ layout: "list" })}
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

function sortProducts(products: any, sortBy: SortOption) {
  switch (sortBy) {
    case "price-low":
      return [...products].sort((a, b) => a.price - b.price);
    case "price-high":
      return [...products].sort((a, b) => b.price - a.price);
    case "name-a-z":
      return [...products].sort((a, b) => a.name.localeCompare(b.name));
    case "name-z-a":
      return [...products].sort((a, b) => b.name.localeCompare(a.name));
    default:
      return products;
  }
}

export default ProductsContainer;
