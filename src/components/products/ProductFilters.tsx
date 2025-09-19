import Link from "next/link";
import { Card, CardContent } from "../ui/card";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { SheetClose } from "../ui/sheet";
import { Badge } from "../ui/badge";

type ProductFiltersProps = {
  categories: string[];
  currentCategory: string;
  currentSort: string;
  currentSearch: string;
  currentLayout: string;
  colors: string[];
  sizes: string[];
  currentColor?: string;
  currentSize?: string;
};

const ProductFilters = ({
  categories,
  currentCategory,
  currentSort,
  currentSearch,
  currentLayout,
  colors,
  sizes,
  currentColor,
  currentSize,
}: ProductFiltersProps) => {
  const createUrl = (params: Record<string, string>) => {
    const searchParams = new URLSearchParams();
    if (currentSearch) {
      searchParams.set("search", currentSearch);
    }
    if (currentCategory !== "all") {
      searchParams.set("category", currentCategory);
    }
    if (currentSort) {
      searchParams.set("sortBy", currentSort);
    }
    searchParams.set("layout", currentLayout);

    if (currentColor) searchParams.set("color", currentColor);
    if (currentSize) searchParams.set("size", currentSize);

    Object.entries(params).forEach(([key, value]) => {
      if (value === undefined || value === "") {
        searchParams.delete(key);
      } else {
        searchParams.set(key, value);
      }
    });

    return `/products?${searchParams.toString()}`;
  };

  return (
    <Card className="sticky top-24 backdrop-blur-xl bg-background/80 border-primary/10 shadow-xl">
      <CardContent className="space-y-8 p-6">
        {/* Category Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-lg">Category</h3>
            {currentCategory !== "all" && (
              <Badge variant="secondary" className="text-xs">
                {currentCategory}
              </Badge>
            )}
          </div>
          <RadioGroup
            defaultValue={currentCategory}
            className="flex flex-row flex-wrap gap-3"
          >
            <div className="inline-flex items-center gap-2 flex-none">
              <SheetClose asChild>
                <Link href={createUrl({ category: "all" })} className="w-full">
                  <div
                    className={`
                    flex gap-3 items-center p-3 rounded-lg border-2 transition-all duration-200
                    ${
                      currentCategory === "all"
                        ? "border-primary bg-primary/10 text-primary shadow-md"
                        : "border-border hover:border-primary/50 hover:bg-accent/50"
                    }
                  `}
                  >
                    <RadioGroupItem
                      value="all"
                      id="all"
                      checked={currentCategory === "all"}
                      className="border-2"
                    />
                    <Label htmlFor="all" className="cursor-pointer font-medium">
                      All Products
                    </Label>
                  </div>
                </Link>
              </SheetClose>
            </div>
            {categories.map((category) => (
              <div
                key={category}
                className="inline-flex items-center gap-2 flex-none"
              >
                <SheetClose asChild>
                  <Link href={createUrl({ category })} className="w-full">
                    <div
                      className={`
                      flex gap-3 items-center p-3 rounded-lg border-2 transition-all duration-200
                      ${
                        currentCategory === category
                          ? "border-primary bg-primary/10 text-primary shadow-md"
                          : "border-border hover:border-primary/50 hover:bg-accent/50"
                      }
                    `}
                    >
                      <RadioGroupItem
                        value={category}
                        id={category}
                        checked={currentCategory === category}
                        className="border-2"
                      />
                      <Label
                        htmlFor={category}
                        className="cursor-pointer capitalize font-medium"
                      >
                        {category}
                      </Label>
                    </div>
                  </Link>
                </SheetClose>
              </div>
            ))}
          </RadioGroup>
        </div>
        {/* Colors Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-lg">Color</h3>
            {currentColor && (
              <Badge variant="secondary" className="text-xs capitalize">
                {currentColor}
              </Badge>
            )}
          </div>
          {/* All Colors Button */}
          <div className="flex flex-row flex-wrap gap-3 mb-4">
            <div className="flex-none">
              <SheetClose asChild>
                <Link href={createUrl({ color: "" })} className="block">
                  <span
                    data-checked={!currentColor ? "true" : "false"}
                    className="
                      inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium
                      border-2 bg-background transition-all duration-200 hover:scale-105
                      data-[checked=true]:border-primary data-[checked=true]:bg-primary/10
                      data-[checked=true]:text-primary data-[checked=true]:shadow-md
                      data-[checked=false]:border-border data-[checked=false]:hover:border-primary/50
                    "
                    role="radio"
                    aria-checked={!currentColor}
                  >
                    All Colors
                  </span>
                </Link>
              </SheetClose>
            </div>
          </div>
          {/* Color Swatches  */}
          <div className="grid grid-cols-6 md:grid-cols-8 gap-3">
            {colors.map((c, index) => {
              const checked = currentColor === c;
              const tokenHexMap: Record<string, string> = {
                black: "#0a0a0a",
                white: "#f5f5f5",
                red: "#ef4444",
                blue: "#3b82f6",
                green: "#22c55e",
                yellow: "#FFFF00",
                silver: "#C0C0C0",
                olive: "#808000",
                teal: "#069494",
                beige: "#f5f5dc",
                gray: "#9ca3af",
                navy: "#1f2a44",
              };
              const bg =
                c.startsWith("#") || c.startsWith("rgb")
                  ? c
                  : tokenHexMap[c] ?? undefined;
              return (
                <div
                  key={c}
                  className="flex-none"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <SheetClose asChild>
                    <Link
                      href={createUrl({ color: c })}
                      className="flex flex-row items-center gap-4"
                    >
                      <input
                        type="radio"
                        id={`color-${c}`}
                        name="color"
                        checked={checked}
                        readOnly
                        className="peer sr-only"
                      />
                      <label
                        htmlFor={`color-${c}`}
                        title={c}
                        className={`
                          block h-10 w-10 rounded-full cursor-pointer transition-all duration-200
                          ring-2 ring-offset-2 ring-offset-background
                          hover:scale-110 hover:shadow-lg
                          ${
                            checked
                              ? "ring-primary ring-offset-4 scale-110 shadow-xl"
                              : "ring-border hover:ring-primary/50"
                          }
                        `}
                        style={{ backgroundColor: bg }}
                        role="radio"
                        aria-checked={checked}
                      />
                      {/* Color name label */}
                      <span className="block text-center text-xs mt-2 capitalize font-medium opacity-70">
                        {c}
                      </span>
                    </Link>
                  </SheetClose>
                </div>
              );
            })}
          </div>
        </div>
        {/* Sizes Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-lg">Size</h3>
            {currentSize && (
              <Badge variant="secondary" className="text-xs uppercase">
                {currentSize}
              </Badge>
            )}
          </div>
          <div className="flex flex-row flex-wrap gap-3">
            {/* All Sizes Button */}
            <div className="flex-none">
              <SheetClose asChild>
                <Link href={createUrl({ size: "" })} className="block">
                  <span
                    data-checked={!currentSize ? "true" : "false"}
                    className="
                      inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium
                      border-2 bg-background transition-all duration-200 hover:scale-105
                      data-[checked=true]:border-primary data-[checked=true]:bg-primary/10
                      data-[checked=true]:text-primary data-[checked=true]:shadow-md
                      data-[checked=false]:border-border data-[checked=false]:hover:border-primary/50
                    "
                    role="radio"
                    aria-checked={!currentSize}
                  >
                    All Sizes
                  </span>
                </Link>
              </SheetClose>
            </div>
            {sizes.map((s, index) => {
              const checked = currentSize === s;
              return (
                <div
                  key={s}
                  className="flex-none"
                  style={{ animationDelay: `${index * 30}ms` }}
                >
                  <SheetClose asChild>
                    <Link href={createUrl({ size: s })} className="block">
                      <span
                        data-checked={checked ? "true" : "false"}
                        className="
                          inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium
                          border-2 bg-background transition-all duration-200 hover:scale-105
                          data-[checked=true]:border-primary data-[checked=true]:bg-primary/10
                          data-[checked=true]:text-primary data-[checked=true]:shadow-md
                          data-[checked=false]:border-border data-[checked=false]:hover:border-primary/50
                          uppercase tracking-wide min-w-[3rem]
                        "
                        role="radio"
                        aria-checked={checked}
                      >
                        {s}
                      </span>
                    </Link>
                  </SheetClose>
                </div>
              );
            })}
          </div>
        </div>
        {/* Active Filters */}
        {(currentCategory !== "all" || currentColor || currentSize) && (
          <div className="pt-4 border-t border-border">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-sm">Active Filters</h4>
              <SheetClose asChild>
                <Link
                  href="/products"
                  className="text-xs text-primary hover:text-primary/80 font-medium"
                >
                  Clear All
                </Link>
              </SheetClose>
            </div>
            <div className="flex flex-wrap gap-2">
              {currentCategory !== "all" && (
                <Badge variant="secondary" className="text-xs">
                  Category: {currentCategory}
                </Badge>
              )}
              {currentColor && (
                <Badge variant="secondary" className="text-xs">
                  Color: {currentColor}
                </Badge>
              )}
              {currentSize && (
                <Badge variant="secondary" className="text-xs">
                  Size: {currentSize}
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductFilters;
