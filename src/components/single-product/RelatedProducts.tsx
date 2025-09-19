import { fetchRelatedProducts } from "@/utils/actions";
import { RelatedProductCarousel } from "./RelatedProductCarousel";

type Props = {
  productId: string;
  type: string;
};

const RelatedProducts = async ({ productId, type }: Props) => {
  const related = await fetchRelatedProducts({ productId, type });
  if (!related) return null;

  return (
    <section className="mt-16">
      <h2 className="text-xl font-semibold">You might also like</h2>
      <div className="mt-5">
        <RelatedProductCarousel
          items={related.map((p) => ({
            id: p.id,
            name: p.name,
            image: p.image,
            price: p.price,
          }))}
        />
      </div>
    </section>
  );
};

export default RelatedProducts;
