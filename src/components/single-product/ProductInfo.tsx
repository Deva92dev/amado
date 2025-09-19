import { formatCurrency } from "@/utils/format";
import ProductRating from "./ProductRating";
import FavoriteToggleButton from "../products/FavoriteToggleButton";
import ShareButton from "./ShareButton";
import { cn } from "@/lib/utils";
import EqualHeightSource from "./EqualHeightSource";
import ProductInfoSelections from "./ProductInfoSelection";

type Props = {
  productId: string;
  price: number;
  type: string;
  className?: string;
  category: string[];
  colors: string[];
  sizes: string[];
  name: string;
  description: string;
  favoriteId: string | null;
  heightVarName?: string;
};

export default function ProductInfoShell({
  productId,
  price,
  type,
  className,
  category,
  colors,
  sizes,
  name,
  description,
  favoriteId,
  heightVarName = "--equal-h",
}: Props) {
  const formattedPrice = formatCurrency(price);
  const categoryText = category.join(", ");

  return (
    <section
      className={cn(
        "relative p-6 rounded-2xl border border-background/30 bg-background/20 backdrop-blur-xl shadow-lg shadow-foreground/20",
        className
      )}
    >
      <EqualHeightSource varName={heightVarName}>
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0">
            <h1 className="truncate text-3xl font-bold capitalize">{name}</h1>
            <div className="mt-1 flex items-center gap-3">
              <ProductRating productId={productId} />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <FavoriteToggleButton
              favoriteId={favoriteId}
              productId={productId}
            />
            <ShareButton name={name} productId={productId} />
          </div>
        </div>
        <div className="mt-4 mb-4">
          <span className="inline-flex items-center rounded-md bg-muted px-3 py-1 text-base font-semibold">
            {formattedPrice}
          </span>
        </div>
        {type ? (
          <span className="rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary capitalize">
            {type}
          </span>
        ) : null}
        <dl className="mt-8 mb-4 flex flex-row gap-3 text-xs text-muted-foreground">
          <dt className="font-normal text-lg text-foreground">Category: </dt>
          <dd className="capitalize font-normal text-lg ">{categoryText}</dd>
        </dl>
        <p>{description}</p>
        <ProductInfoSelections
          productId={productId}
          colors={colors}
          sizes={sizes}
          className="mt-4"
        />
      </EqualHeightSource>
    </section>
  );
}
