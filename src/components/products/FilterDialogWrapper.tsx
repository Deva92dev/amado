import { fetchProductMeta } from "@/utils/actions";
import FilterDialog from "./FilterDialog";

const FilterDialogWrapper = async ({
  paramsPromise,
}: {
  paramsPromise: Promise<any>;
}) => {
  const params = await paramsPromise;
  const meta = await fetchProductMeta();

  return (
    <FilterDialog
      categories={meta.categories}
      colors={meta.colors}
      sizes={meta.sizes}
      // FIX: Default to "all" or "" to prevent "undefined" string in URL
      currentCategory={params.category || "all"}
      currentSort={params.sortBy || "name-a-z"}
      currentSearch={params.search || ""}
      currentLayout={params.layout || "grid"}
      // Pass other potential missing params with defaults
      currentColor={params.color || ""}
      currentSize={params.size || ""}
    />
  );
};

export default FilterDialogWrapper;
