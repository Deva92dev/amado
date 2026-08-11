"use client";

import { useCallback, useState, useTransition } from "react";
import ProductsGrid from "./ProductsGrid";
import ProductsList from "./ProductsList";
import { ProductWithFavorite } from "./ProductsContainer";
import { fetchMoreProducts } from "@/utils/actions";

const BATCH_SIZE = 6;

interface LoadMoreProps {
  initialProducts: ProductWithFavorite[];
  total: number;
  layout: string;
  search?: string;
  color?: string;
  size?: string;
  category: string;
  sortBy?: string;
}

const LoadMore = ({
  initialProducts,
  total,
  layout,
  search = "",
  color = "",
  size = "",
  category,
  sortBy = "name-a-z",
}: LoadMoreProps) => {
  const [products, setProducts] = useState(initialProducts);
  const [hasMore, setHasMore] = useState(initialProducts.length < total);
  const [isPending, startTransition] = useTransition();

  const onLoadMore = useCallback(() => {
    if (!hasMore || isPending) return;
    startTransition(async () => {
      const more = await fetchMoreProducts({
        offset: products.length,
        limit: BATCH_SIZE,
        sortBy: sortBy as any,
        search,
        category,
        color,
        size,
      });
      const normalized = (more as any[]).map((m) => ({
        ...m,
        favoriteId: m.favoriteIds?.[0] ?? null,
      }));
      setProducts((prev) => [...prev, ...normalized]);
      if (products.length + normalized.length >= total) setHasMore(false);
    });
  }, [hasMore, isPending, products.length, sortBy, search, category, color, size, total]);

  return (
    <>
      {layout === "grid" ? (
        <ProductsGrid products={products} />
      ) : (
        <ProductsList products={products} />
      )}

      <div className="mt-8 flex items-center justify-center">
        {hasMore ? (
          <button
            type="button"
            onClick={onLoadMore}
            disabled={isPending}
            className="mt-8 mx-auto block rounded-lg px-6 py-3 bg-gradient-electric text-background font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-accent cursor-pointer disabled:opacity-60"
          >
            {isPending ? "Loading…" : "Load more"}
          </button>
        ) : (
          products.length > 0 && (
            <p className="text-center text-muted-foreground">
              You have reached the end.
            </p>
          )
        )}
      </div>
    </>
  );
};

export default LoadMore;
