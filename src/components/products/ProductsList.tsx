import { formatCurrency } from "@/utils/format";
import { Card, CardContent } from "../ui/card";
import Link from "next/link";
import Image from "next/image";
import FavoriteToggleButton from "./FavoriteToggleButton";
import { ProductWithFavorite } from "./ProductsContainer";

interface ProductListProps {
  products: ProductWithFavorite[];
}

const ProductsList = ({ products }: ProductListProps) => {
  return (
    <div className="pt-12 grid gap-8" data-products-grid>
      {products.map((product, index) => {
        const { name, price, image, favoriteIds, type, colors, sizes } =
          product;
        const productId = product.id;
        const formattedPrice = formatCurrency(price);
        const favoriteId = favoriteIds?.[0] ?? null;
        // Staggered animation delay
        const animationDelay = `${index * 100}ms`;
        // Determine if this is a featured product (every 5th item for list view)
        const isFeatured = (index + 1) % 5 === 0;

        return (
          <article
            key={productId}
            className="group relative animate-fade-in-up opacity-0 animation-fill-forwards"
            style={
              {
                animationDelay,
                animationDuration: "0.6s",
                "--tw-translate-y": "20px",
              } as React.CSSProperties
            }
          >
            <Link href={`/products/${productId}`}>
              <Card
                className={`
                  bg-secondary text-secondary-foreground rounded-xl
                  will-change-transform transition-all duration-500 ease-out
                  group-hover:shadow-2xl group-hover:shadow-primary/10
                  group-hover:-translate-y-1 group-hover:scale-[1.01]
                  group-hover:bg-accent group-hover:text-accent-foreground
                  overflow-hidden
                  ${isFeatured ? "ring-2 ring-primary/20 shadow-lg" : ""}
                `}
              >
                <CardContent className="p-0 relative">
                  {/* Featured Badge */}
                  {isFeatured && (
                    <div className="absolute top-6 left-6 z-20">
                      <span className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                        Featured
                      </span>
                    </div>
                  )}
                  <div className="grid gap-6 md:grid-cols-[300px_1fr_auto] p-8 items-center">
                    {/* Image Section */}
                    <div className="relative h-64 md:h-56 overflow-hidden rounded-xl group/image">
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                      {/* Premium Background Pattern */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-[5]" />
                      <Image
                        src={image}
                        alt={name}
                        fill
                        priority={index < 2}
                        loading={index < 2 ? "eager" : "lazy"}
                        sizes="(max-width: 768px) 90vw, 300px"
                        quality={60}
                        className="rounded-xl object-cover transition-all duration-700 group-hover:scale-110"
                      />
                    </div>
                    {/* Content Section */}
                    <div className="flex flex-col gap-4 min-w-0">
                      <div className="flex flex-col gap-2">
                        <h2 className="text-2xl font-semibold capitalize leading-tight group-hover:text-primary transition-colors duration-300 truncate">
                          {name}
                        </h2>
                        {type && (
                          <p className="text-base text-muted-foreground capitalize tracking-wide">
                            {type}
                          </p>
                        )}
                      </div>
                      {/* Color Swatches */}
                      {colors && colors.length > 0 && (
                        <div className="flex flex-row gap-2 flex-wrap">
                          {colors.slice(0, 6).map((c, colorIndex) => {
                            const COLOR_HEX: Record<string, string> = {
                              black: "#0a0a0a",
                              white: "#f5f5f5",
                              red: "#ef4444",
                              blue: "#3b82f6",
                              green: "#22c55e",
                              beige: "#f5f5dc",
                              gray: "#9ca3af",
                              navy: "#1f2a44",
                              yellow: "#FFFF00",
                              silver: "#C0C0C0",
                              olive: "#808000",
                            };

                            function toHex(c: string | undefined) {
                              if (!c) return undefined;
                              if (c.startsWith("#") || c.startsWith("rgb"))
                                return c;
                              return COLOR_HEX[c] ?? undefined;
                            }

                            const bg = toHex(c);
                            return (
                              <span
                                key={`${productId}-${c}`}
                                className="inline-block h-6 w-6 rounded-full ring-2 ring-background shadow-md group-hover:scale-110 transition-transform duration-200"
                                title={c}
                                style={{
                                  backgroundColor: bg,
                                  animationDelay: `${colorIndex * 50}ms`,
                                }}
                              />
                            );
                          })}
                          {colors.length > 6 && (
                            <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-muted text-muted-foreground text-xs font-medium">
                              +{colors.length - 6}
                            </span>
                          )}
                        </div>
                      )}
                      {/* Size Indicator */}
                      {sizes && sizes.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {sizes.slice(0, 6).map((size) => (
                            <span
                              key={`${productId}-${size}`}
                              className="text-sm bg-secondary text-secondary-foreground px-3 py-1 rounded-md font-medium uppercase tracking-wider opacity-70 group-hover:opacity-100 transition-opacity duration-200"
                            >
                              {size}
                            </span>
                          ))}
                          {sizes.length > 6 && (
                            <span className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-md font-medium">
                              +{sizes.length - 6}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                    {/* Price Section */}
                    <div className="flex flex-col items-end gap-2 md:items-center">
                      <p className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                        {formattedPrice}
                      </p>
                      {isFeatured && (
                        <span className="text-sm text-muted-foreground line-through opacity-60">
                          {formatCurrency(price * 1.15)}
                        </span>
                      )}
                      <div className="mt-2">
                        <FavoriteToggleButton
                          favoriteId={favoriteId ?? null}
                          productId={productId}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </article>
        );
      })}
    </div>
  );
};

export default ProductsList;
