import ProductsContainer from "@/components/products/ProductsContainer";
import { Metadata } from "next";

type ProductPageProps = {
  searchParams: Promise<{
    layout?: string;
    search?: string;
  }>;
};

export const generateMetadata = async ({
  searchParams,
}: ProductPageProps): Promise<Metadata> => {
  const { search } = await searchParams;
  const title = search
    ? `Search results for "${search}" - Amado`
    : "Shop Products - Amado";
  const description = search
    ? `Browse our collection of products matching "${search}" at Amado.`
    : "Explore a wide range of trending fashion products at Amado";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: "/products",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
};

const ProductsPage = async ({ searchParams }: ProductPageProps) => {
  const { layout = "grid", search = "" } = await searchParams;
  return (
    <>
      <ProductsContainer layout={layout} search={search} />
    </>
  );
};

export default ProductsPage;
