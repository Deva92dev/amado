import { readRecentlyViewed } from "@/lib/recentlyViewed";
import { fetchProductByIds } from "@/utils/actions";
import { RelatedProductCarousel } from "./RelatedProductCarousel";

export default async function RecentlyViewedSection() {
  const ids = readRecentlyViewed();
  if (!ids) return null;
  const products = await fetchProductByIds(await ids);
  if (!products.length) return null;

  return (
    <section className="mt-16">
      <h2 className="text-xl font-semibold">Recently viewed</h2>
      <div className="mt-5">
        <RelatedProductCarousel
          variant="recent"
          showControls
          items={products.map((p) => ({
            id: p.id,
            name: p.name,
            image: p.image,
            price: p.price,
          }))}
        />
      </div>
    </section>
  );
}
