import Link from "next/link";
import dynamic from "next/dynamic";
import { Grid2X2, List } from "lucide-react";
import { fetchAllProducts } from "@/utils/actions";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { SortOption } from "@/app/products/page";
import SortSelect from "./SortSelect";
import LoadMoreSkeleton from "./LoadMoreSkeleton";
import { getOptionalAuth } from "@/lib/clerk/authServer";

export type ProductWithFavorite = Awaited<
  ReturnType<typeof fetchAllProducts>
>[0] & {
  favoriteId: string | null;
};

type ProductContainerProps = {
  layout?: string;
  search?: string;
  category?: string;
  color?: string;
  size?: string;
  sortBy?: SortOption;
};

const LoadMore = dynamic(() => import("@/components/products/LoadMore"), {
  loading: () => <LoadMoreSkeleton />,
});

const ProductsContainer = async ({
  layout = "grid",
  search = "",
  category = "all",
  sortBy = "name-a-z",
  color = "",
  size = "",
}: ProductContainerProps) => {
  const userId = await getOptionalAuth();
  const initialProductsRaw = await fetchAllProducts({
    search,
    category,
    color,
    size,
    userId: userId ?? null,
  });

  // Products already include isFavorited/favoriteIds from the single query
  const initialProducts = sortProducts(initialProductsRaw, sortBy);
  const totalProducts = initialProducts.length;

  const createUrl = (newParams: Record<string, string>) => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (category !== "all") params.set("category", category);
    if (sortBy) params.set("sortBy", sortBy);
    if (color) params.set("color", color);
    if (size) params.set("size", size);
    Object.entries(newParams).forEach(([key, value]) => params.set(key, value));
    return `/products?${params.toString()}`;
  };

  return (
    <>
      <section>
        <div className="flex justify-between items-center">
          <h2 className="font-medium text-lg">
            Showing {totalProducts} product{totalProducts > 1 ? "s" : ""}
          </h2>
          <div className="flex gap-4">
            <SortSelect
              sortBy={sortBy}
              layout={layout}
              search={search}
              category={category}
            />
            <Button
              asChild
              size="icon"
              variant={layout === "grid" ? "default" : "ghost"}
              aria-label="Grid layout"
            >
              <Link href={createUrl({ layout: "grid" })}>
                <Grid2X2 aria-hidden="true" focusable="false" />
                <span className="sr-only">Grid layout</span>
              </Link>
            </Button>
            <Button
              asChild
              size="icon"
              variant={layout === "list" ? "default" : "ghost"}
              aria-label="list-layout"
            >
              <Link href={createUrl({ layout: "list" })}>
                <List aria-hidden="true" focusable="false" />
                <span className="sr-only">List layout</span>
              </Link>
            </Button>
          </div>
        </div>
        <Separator className="mt-4" />
      </section>
      <div>
        {initialProducts.length === 0 ? (
          <h5 className="text-2xl mt-12">
            Sorry, no products matched your search...
          </h5>
        ) : (
          <LoadMore
            initialProducts={initialProducts}
            layout={layout}
            color={color}
            size={size}
            category={category}
          />
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
