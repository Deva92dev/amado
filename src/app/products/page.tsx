import ProductsContainer from "@/components/products/ProductsContainer";

const ProductsPage = async ({
  searchParams,
}: {
  searchParams: { layout?: string; search?: string };
}) => {
  // const searchParam = searchParams;
  const layout = (await searchParams).layout || "grid";
  const search = (await searchParams).search || "";
  return (
    <>
      <ProductsContainer layout={layout} search={search} />
    </>
  );
};

export default ProductsPage;
