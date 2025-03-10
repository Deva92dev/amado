import { formatCurrency } from "@/utils/format";
import { Product } from "@prisma/client";
import { Card, CardContent } from "../ui/card";
import Link from "next/link";
import Image from "next/image";
import FavoriteToggleButton from "./FavoriteToggleButton";

interface ProductWithFavorite extends Product {
  favoriteId?: string | null;
}

interface ProductListProps {
  products: ProductWithFavorite[];
}

const ProductsList = ({ products }: ProductListProps) => {
  return (
    <div className="pt-12 grid  gap-y-8">
      {products.map((product) => {
        const { name, price, image, category, favoriteId } = product;
        const productId = product.id;
        const formattedPrice = formatCurrency(price);
        const formattedCategory = category.join(", ");

        return (
          <article key={productId} className="group relative">
            <Link href={`/products/${productId}`}>
              <Card className="transform group-hover:shadow-xl transition-shadow duration-500">
                <CardContent className="p-8 grid gap-4 md:grid-cols-3">
                  <div className="relative h-64 md:h-48 md:w-48">
                    <Image
                      src={image}
                      alt={name}
                      fill
                      sizes="(max-width: 480px) 95vw, (max-width: 768px) 90vw, (max-width: 1200px) 85vw, 75vw"
                      loading="lazy"
                      className="w-full rounded-md object-cover"
                    />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold capitalize">{name}</h2>
                    <h4 className="text-muted-foreground">
                      {formattedCategory}
                    </h4>
                  </div>
                  <p className="text-muted-foreground text-lg md:ml-auto">
                    {formattedPrice}
                  </p>
                </CardContent>
              </Card>
            </Link>
            <div className="absolute bottom-8 right-8 z-50">
              <FavoriteToggleButton
                favoriteId={favoriteId ?? null}
                productId={productId}
              />
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default ProductsList;
