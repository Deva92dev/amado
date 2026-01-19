import CheckboxInput from "@/components/form/CheckboxInput";
import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";
import ImageInput from "@/components/form/ImageInput";
import MultipleFormInput from "@/components/form/MultipleFormInput";
import PriceInput from "@/components/form/PriceInput";
import { SubmitButton } from "@/components/form/Buttons";
import TextAreaInput from "@/components/form/TextAreaInput";
import { createProductAction } from "@/utils/actions";

const CreateProductPage = () => {
  return (
    <section className="py-16">
      <h1 className="text-2xl font-semibold capitalize mb-8">Create Product</h1>
      <div className="border p-8 rounded-md">
        <FormContainer action={createProductAction}>
          <div className="grid gap-4 md:grid-cols-2 my-4">
            <FormInput
              name="name"
              type="text"
              label="product name"
              defaultValue="name"
            />
            <MultipleFormInput
              name="category"
              type="text"
              label="category"
              placeholder="Type a category name and press enter"
              defaultValue={["men", "women"]}
            />
            <PriceInput />
            <ImageInput />
          </div>
          <TextAreaInput
            name="description"
            labelText="product description"
            defaultValue="description"
          />
          <div className="mt-6">
            <CheckboxInput name="featured" label="featured" />
          </div>
          <SubmitButton text="create product" className="mt-8" />
        </FormContainer>
      </div>
    </section>
  );
};

export default CreateProductPage;
