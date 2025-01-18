import { z, ZodSchema } from "zod";

export function ValidateWithZodSchema<T>(
  schema: ZodSchema<T>,
  data: unknown
): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    const errors = result.error.errors.map((error) => error.message);
    throw new Error(errors.join(", "));
  }
  return result.data;
}

export const validateImageFile = () => {
  const maxUploadSize = 1024 * 1024;
  const acceptedFileTypes = ["image/"];

  return z
    .instanceof(File)
    .refine((file) => {
      return !file || file.size <= maxUploadSize;
    }, "File Size must be less than 1 MB")
    .refine((file) => {
      return (
        !file || acceptedFileTypes.some((type) => file.type.startsWith(type))
      );
    }, "File must be an image");
};

export const productSchema = z.object({
  name: z.string().min(2, { message: "Name must be 4 characters long" }),
  category: z.array(
    z.string({ message: "Category must be an array of string" })
  ),
  price: z.coerce
    .number()
    .int()
    .min(0, { message: "Price must be a positive number" }),
  description: z.string().refine(
    (description) => {
      const wordCount = description.split(" ").length;
      return wordCount >= 10 && wordCount <= 1000;
    },
    { message: "description must be between 10 and 1000 words" }
  ),
  featured: z.coerce.boolean(),
});

export const imageSchema = z.object({
  image: validateImageFile(),
});
