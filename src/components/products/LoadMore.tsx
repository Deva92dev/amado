"use client";

import { useMemo, useState, useCallback } from "react";
import ProductsGrid from "./ProductsGrid";
import ProductsList from "./ProductsList";
import { ProductWithFavorite } from "./ProductsContainer";

const BATCH_SIZE = 6;

interface LoadMoreProps {
  initialProducts: ProductWithFavorite[];
  layout: string;
  color?: string;
  size?: string;
  category: string;
}

const LoadMore = ({ initialProducts, layout }: LoadMoreProps) => {
  const total = initialProducts.length;
  const [visibleCount, setVisibleCount] = useState(Math.min(BATCH_SIZE, total));
  const [isLoading, setIsLoading] = useState(false);

  const hasMore = visibleCount < total;

  const onLoadMore = useCallback(() => {
    if (!hasMore || isLoading) return;
    setIsLoading(true);
    setTimeout(() => {
      setVisibleCount((v) => Math.min(v + BATCH_SIZE, total));
      setIsLoading(false);
    }, 120);
  }, [hasMore, isLoading, total]);

  const products = useMemo(
    () => initialProducts.slice(0, visibleCount),
    [initialProducts, visibleCount]
  );

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
            disabled={isLoading}
            className="mt-8 mx-auto block rounded-lg px-6 py-3 bg-gradient-electric text-background font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-accent cursor-pointer"
          >
            {isLoading ? "Loading…" : "Load more"}
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
