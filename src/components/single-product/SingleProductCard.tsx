import Image from "next/image";
import Link from "next/link";

type CardVariant =
  | "related" // image-first, compact price under title
  | "recent"; // minimal card with small badge + subtle shadow

type Props = {
  id: string;
  name: string;
  price: number;
  image: string;
  variant?: CardVariant;
  className?: string;
};

const base = "group block rounded-lg border transition-shadow";
const variants: Record<CardVariant, string> = {
  related: `
    border border-[color:var(--color-border)] 
    bg-[color:var(--color-card)] 
    text-[color:var(--color-card-foreground)] 
    hover:shadow-lg 
    dark:border-[color:var(--color-border)] 
    dark:bg-[color:var(--color-card)] 
    rounded-xl`,

  recent: `
    border border-[color:var(--color-border)] 
    bg-[color:var(--color-background)/40] 
    ring-1 ring-[color:var(--color-ring)/60] 
    rounded-xl 
    hover:shadow-md 
    dark:bg-[color:var(--color-card)/40]`,
};
const imageWrappers: Record<CardVariant, string> = {
  related: "relative aspect-[4/5] overflow-hidden rounded-t-lg bg-muted",
  recent: "relative aspect-square overflow-hidden rounded-md bg-muted",
};
const titleStyles: Record<CardVariant, string> = {
  related: "text-sm text-muted-foreground line-clamp-1",
  recent: "text-xs font-medium line-clamp-1",
};
const priceStyles: Record<CardVariant, string> = {
  related: "mt-1 text-base font-semibold",
  recent: "mt-0.5 text-xs text-foreground/80",
};
const hoverImg: Record<CardVariant, string> = {
  related:
    "object-cover transition-transform duration-300 group-hover:scale-[1.03]",
  recent:
    "object-cover transition-transform duration-300 group-hover:scale-[1.02]",
};

const SingleProductCard = ({
  id,
  image,
  name,
  price,
  className,
  variant = "related",
}: Props) => {
  return (
    <Link
      href={`/products/${id}`}
      className={`${base} ${variants[variant]} ${className ?? ""}`}
    >
      <div className={imageWrappers[variant]}>
        <Image
          src={image}
          alt={name}
          fill
          className={hoverImg[variant]}
          sizes="(max-width: 480px) 40vw, (max-width: 768px) 30vw, 16vw"
        />
      </div>
      <div className="p-2 md:p-3">
        <p className={titleStyles[variant]}>{name}</p>
        <p className={priceStyles[variant]}>₹{price.toLocaleString()}</p>
      </div>
    </Link>
  );
};

export default SingleProductCard;
