import { fetchProductCategories } from "@/utils/actions";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import Link from "next/link";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

type ProductFiltersProps = {
  currentCategory: string;
  currentSort: string;
  currentSearch: string;
  currentLayout: string;
};

const ProductFilters = async ({
  currentCategory,
  currentSort,
  currentSearch,
  currentLayout,
}: ProductFiltersProps) => {
  const categories = await fetchProductCategories();

  const createUrl = (params: Record<string, string>) => {
    const searchParams = new URLSearchParams();

    // Add current search if it exists
    if (currentSearch) {
      searchParams.set("search", currentSearch);
    }

    // Add current layout
    searchParams.set("layout", currentLayout);

    // add new params
    Object.entries(params).forEach(([Key, value]) => {
      searchParams.set(Key, value);
    });

    return `/products?${searchParams.toString()}`;
  };
  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Category Filter */}
        <div>
          <h3 className="font-medium mb-4">Category</h3>
          <RadioGroup defaultValue={currentCategory} className="space-y-2">
            <div className="flex items-center space-x-2">
              <Link href={createUrl({ category: "all" })} className="w-full">
                <div className="flex gap-2 items-center">
                  <RadioGroupItem
                    value="all"
                    id="all"
                    checked={currentCategory === "all"}
                  />
                  <Label htmlFor="all" className="cursor-pointer">
                    All Products
                  </Label>
                </div>
              </Link>
            </div>

            {categories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Link href={createUrl({ category })} className="w-full">
                  <div className="flex gap-2 items-center">
                    <RadioGroupItem
                      value={category}
                      id={category}
                      checked={currentCategory === category}
                    />
                    <Label
                      htmlFor={category}
                      className="cursor-pointer capitalize"
                    >
                      {category}
                    </Label>
                  </div>
                </Link>
              </div>
            ))}
          </RadioGroup>
        </div>
        <Separator />

        {/* Sort Filter */}
        <div>
          <h3 className="font-medium mb-4">Sort By</h3>
          <RadioGroup defaultValue={currentSort} className="space-y-2">
            <div className="flex items-center space-x-2">
              <Link href={createUrl({ sortBy: "name-a-z" })} className="w-full">
                <div className="flex gap-2 items-center">
                  <RadioGroupItem
                    value="name-a-z"
                    id="name-a-z"
                    checked={currentSort === "name-a-z"}
                  />
                  <Label htmlFor="name-a-z" className="cursor-pointer">
                    Name (A-Z)
                  </Label>
                </div>
              </Link>
            </div>

            <div className="flex items-center space-x-2">
              <Link href={createUrl({ sortBy: "name-z-a" })} className="w-full">
                <div className="flex gap-2 items-center">
                  <RadioGroupItem
                    value="name-z-a"
                    id="name-z-a"
                    checked={currentSort === "name-z-a"}
                  />
                  <Label htmlFor="name-z-a" className="cursor-pointer">
                    Name (Z-A)
                  </Label>
                </div>
              </Link>
            </div>

            <div className="flex items-center space-x-2">
              <Link
                href={createUrl({ sortBy: "price-low" })}
                className="w-full"
              >
                <div className="flex gap-2 items-center">
                  <RadioGroupItem
                    value="price-low"
                    id="price-low"
                    checked={currentSort === "price-low"}
                  />
                  <Label htmlFor="price-low" className="cursor-pointer">
                    Price (Low to High)
                  </Label>
                </div>
              </Link>
            </div>

            <div className="flex items-center space-x-2">
              <Link
                href={createUrl({ sortBy: "price-high" })}
                className="w-full"
              >
                <div className="flex gap-2 items-center">
                  <RadioGroupItem
                    value="price-high"
                    id="price-high"
                    checked={currentSort === "price-high"}
                  />
                  <Label htmlFor="price-high" className="cursor-pointer">
                    Price (High to Low)
                  </Label>
                </div>
              </Link>
            </div>
          </RadioGroup>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductFilters;
