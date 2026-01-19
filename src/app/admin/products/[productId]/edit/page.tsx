import { SubmitButton } from "@/components/form/Buttons";
import CheckboxInput from "@/components/form/CheckboxInput";
import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";
import ImageInputContainer from "@/components/form/ImageInputContainer";
import MultipleFormInput from "@/components/form/MultipleFormInput";
import PriceInput from "@/components/form/PriceInput";
import TextAreaInput from "@/components/form/TextAreaInput";
import {
  fetchAdminProductDetails,
  updateProductAction,
  updateProductImageAction,
} from "@/utils/actions";

type EditPageProps = {
  params: Promise<{
    productId: string;
  }>;
};

const EditProductPage = async ({ params }: EditPageProps) => {
  const { productId } = await params;
  const product = await fetchAdminProductDetails(productId);
  const { category, name, price, featured, description } = product;

  return (
    <section className="py-16">
      <h1 className="text-2xl font-semibold capitalize mb-8">Update {name}</h1>
      <div className="border p-8 rounded-md">
        <ImageInputContainer
          action={updateProductImageAction}
          name={name}
          image={product.image}
          text="update image"
        >
          <input type="hidden" name="id" value={productId} />
          <input type="hidden" name="url" value={product.image} />
        </ImageInputContainer>
        <FormContainer action={updateProductAction}>
          <div className="grid gap-4 md:grid-cols-2 my-4">
            <input type="hidden" name="id" value={productId} />
            <FormInput
              type="text"
              name="name"
              label="product name"
              defaultValue={name}
            />
            <MultipleFormInput
              type="text"
              name="category"
              label="category"
              defaultValue={category ?? []}
            />
            <PriceInput defaultValue={price} />
          </div>
          <TextAreaInput
            name="description"
            labelText="product description"
            defaultValue={description}
          />
          <div className="mt-6">
            <CheckboxInput
              name="featured"
              label="featured"
              defaultChecked={featured}
            />
          </div>
          <SubmitButton text="Update Product" className="mt-8" />
        </FormContainer>
      </div>
    </section>
  );
};

export default EditProductPage;
