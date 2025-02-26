import { formatCurrency } from "@/utils/format";
import { Product } from "@prisma/client";
import Link from "next/link";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import FavoriteToggleButton from "./FavoriteToggleButton";

interface ProductWithFavorite extends Product {
  favoriteId: string | null;
}

interface ProductsGridProps {
  products: ProductWithFavorite[];
}

const ProductsGrid = ({ products }: ProductsGridProps) => {
  return (
    <div className="pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => {
        const { name, price, image, favoriteId } = product;
        const productId = product.id;
        const formattedPrice = formatCurrency(price);
        return (
          <article key={productId} className="group relative">
            <Link href={`/products/${productId}`}>
              <Card className="bg-secondary text-secondary-foreground rounded-lg transition-all transform group-hover:shadow-xl group-hover:bg-accent group-hover:text-accent-foreground duration-500 ">
                <CardContent className="p-4">
                  <div className="relative h-64 md:h-48 rounded overflow-hidden">
                    <Image
                      src={image}
                      alt={name}
                      fill
                      loading="lazy"
                      sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
                      className="rounded-lg object-cover w-full bg-gradient-to-t from-black/30 to-transparent transform group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="mt-4 text-center">
                    <h2 className="text-lg font-medium capitalize">{name}</h2>
                    <p className="text-muted-foreground mt-2 font-semibold">
                      {formattedPrice}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
            <div className="absolute top-7 right-7 z-50">
              <FavoriteToggleButton
                productId={productId}
                favoriteId={favoriteId ?? null}
              />
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default ProductsGrid;
