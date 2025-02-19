import { createClient } from "@supabase/supabase-js";
import { env } from "../../env";

const bucket = "amado-bucket";

// Create a single supabase client for interacting with your database
export const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_KEY);

export const uploadImage = async (image: File, folder: string) => {
  const timestamp = Date.now();
  const newName = `${folder}/${timestamp}-${image.name}`;

  const { data } = await supabase.storage.from(bucket).upload(newName, image, {
    cacheControl: "3600",
  });

  if (!data) throw new Error("image upload failed");
  return supabase.storage.from(bucket).getPublicUrl(newName).data.publicUrl;
};

export const deleteImage = (url: string, folder: string) => {
  const decodedUrl = decodeURIComponent(url);
  const fileName = decodedUrl.split("/").pop();
  if (!fileName) throw new Error("Invalid URL: File name not found.");
  const filePath = `${folder}/${fileName}`;
  return supabase.storage.from(bucket).remove([filePath]);
};
