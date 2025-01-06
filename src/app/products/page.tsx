import ProductsContainer from "@/components/products/ProductsContainer";

type ProductPageProps = {
  searchParams: Promise<{
    layout?: string;
    search?: string;
  }>;
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
