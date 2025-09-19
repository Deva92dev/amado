import Image from "next/image";
import { formatCurrency } from "@/utils/format";
import { Card, CardContent } from "../ui/card";
import ImageActions from "./ImageActions";

type ProductForGrid =
  | {
      id: string;
      name: string;
      price: number;
      image: string;
      type?: string;
      colors: string[];
      sizes: string[];
      favoriteIds: string[];
    }
  | {
      id: string;
      name: string;
      price: number;
      image: string;
      type?: string;
      colors: string[];
      sizes: string[];
      favoriteId: string | null;
    };

interface ProductsGridProps {
  products: ProductForGrid[];
}

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
  if (c.startsWith("#") || c.startsWith("rgb")) return c;
  return COLOR_HEX[c] ?? undefined;
}

const ProductsGrid = ({ products }: ProductsGridProps) => {
  return (
    <div
      className="pt-12 grid gap-6 grid-cols-1 lg:grid-cols-2"
      data-products-grid
    >
      {products.map((product, index) => {
        const {
          name,
          price,
          image,
          id,
          type,
          colors = [],
          sizes = [],
        } = product;
        const productId = id;
        const formattedPrice = formatCurrency(price);

        // Narrow the union and compute a single favoriteId
        const favoriteId =
          "favoriteIds" in product
            ? product.favoriteIds?.[0] ?? null
            : product.favoriteId ?? null;

        const animationDelay = `${index * 100}ms`;
        const isFeatured = (index + 1) % 4 === 0;

        return (
          <article
            key={productId}
            className="group relative flex flex-col animate-fade-in-up opacity-0 animation-fill-forwards"
            style={
              {
                animationDelay,
                animationDuration: "0.6s",
                "--tw-translate-y": "20px",
              } as React.CSSProperties
            }
          >
            <div className="flex flex-col flex-grow">
              <Card
                className={`
                bg-secondary text-secondary-foreground rounded-xl 
                will-change-transform transition-all duration-500 ease-out
                group-hover:shadow-2xl group-hover:shadow-primary/10
                group-hover:-translate-y-2 group-hover:scale-[1.02]
                group-hover:bg-accent group-hover:text-accent-foreground 
                flex flex-col flex-grow overflow-hidden
                ${isFeatured ? "ring-2 ring-primary/20 shadow-lg" : ""}
              `}
              >
                <CardContent className="p-0 flex h-full min-h-[420px] md:min-h-[520px] lg:min-h-[620px] flex-col relative">
                  {/* Featured Badge */}
                  {isFeatured && (
                    <div className="absolute top-4 left-4 z-20">
                      <span className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                        Featured
                      </span>
                    </div>
                  )}
                  <div className="relative w-full flex-1 overflow-hidden rounded-t-xl">
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
                      sizes="(max-width: 768px) 90vw, 45vw"
                      quality={60}
                      className="rounded-t-xl object-cover w-full h-full transition-all duration-700 group-hover:scale-110"
                    />
                    {/* Image Actions */}
                    <div className="absolute inset-0 z-20">
                      <ImageActions
                        productId={productId}
                        favoriteId={favoriteId}
                        productHref={`/products/${product.id}`}
                      />
                    </div>
                  </div>
                  {/* Content */}
                  <div className="p-6 flex flex-col gap-3 bg-gradient-to-b from-transparent via-background/50 to-background">
                    <div className="flex flex-row justify-between items-start">
                      <div className="flex flex-col gap-2 flex-1">
                        <h2 className="text-lg font-semibold capitalize leading-tight group-hover:text-primary transition-colors duration-300">
                          {name}
                        </h2>
                        {type && (
                          <p className="text-sm text-muted-foreground capitalize tracking-wide">
                            {type}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <p className="text-lg font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                          {formattedPrice}
                        </p>
                        {isFeatured && (
                          <span className="text-xs text-muted-foreground line-through opacity-60">
                            {formatCurrency(price * 1.2)}
                          </span>
                        )}
                      </div>
                    </div>
                    {/* Color Swatches */}
                    {colors.length > 0 && (
                      <div className="flex flex-row gap-2 flex-wrap">
                        {colors.slice(0, 4).map((c, colorIndex) => {
                          const bg = toHex(c);
                          return (
                            <span
                              key={`${productId}-${c}`}
                              className="inline-block h-5 w-5 rounded-full ring-2 ring-background shadow-md group-hover:scale-110 transition-transform duration-200"
                              title={c}
                              style={{
                                backgroundColor: bg,
                                animationDelay: `${colorIndex * 50}ms`,
                              }}
                            />
                          );
                        })}
                        {colors.length > 4 && (
                          <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-muted text-muted-foreground text-xs font-medium">
                            +{colors.length - 4}
                          </span>
                        )}
                      </div>
                    )}
                    {/* Size Indicator */}
                    {sizes.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {sizes.slice(0, 4).map((size) => (
                          <span
                            key={`${productId}-${size}`}
                            className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-md font-medium uppercase tracking-wider opacity-70 group-hover:opacity-100 transition-opacity duration-200"
                          >
                            {size}
                          </span>
                        ))}
                        {sizes.length > 4 && (
                          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-md font-medium">
                            +{sizes.length - 4}
                          </span>
                        )}
                      </div>
                    )}
                    <div className="mt-auto" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default ProductsGrid;
