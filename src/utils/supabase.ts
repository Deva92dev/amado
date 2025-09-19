import { createClient } from "@supabase/supabase-js";
import { env } from "../../env";

const bucket = "amado-bucket";

// Create a single supabase client for interacting with your database
export const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_KEY, {
  auth: {
    persistSession: true,
    detectSessionInUrl: true,
    // Optionally config for cookies if SSR
    // storageKey: 'supabase.auth.token',    (default)
    // autoRefreshToken: true,
  },
});

export const uploadImage = async (image: File, folder: string) => {
  const timestamp = Date.now();
  const newName = `${folder}/${timestamp}-${image.name}`;

  const { data } = await supabase.storage.from(bucket).upload(newName, image, {
    cacheControl: "3600",
  });

  if (!data) throw new Error("image upload failed");
  return supabase.storage.from(bucket).getPublicUrl(newName).data.publicUrl;
};

export const deleteImage = async (url: string, folder: string) => {
  const decodedUrl = decodeURIComponent(url);
  const fileName = decodedUrl.split("/").pop();
  if (!fileName) throw new Error("Invalid URL: File name not found.");
  const filePath = `${folder}/${fileName}`;
  return supabase.storage.from(bucket).remove([filePath]);
};

export const uploadVideo = async (
  video: File,
  folder: string,
  userId: string
) => {
  const timestamp = Date.now();
  // Put userId inside filename or folder to associate
  const newName = `${folder}/${userId}-${timestamp}-${video.name}`;

  const mimeType = video.type === "video/webm" ? "video/webm" : "video/mp4";

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(newName, video, {
      cacheControl: "2592000", // 1 month
      contentType: mimeType,
      upsert: true,
    });

  if (error || !data) {
    console.error("Supabase Storage upload error:", error);
    throw new Error(
      `Video upload failed: ${error?.message ?? "Unknown error"}`
    );
  }

  return supabase.storage.from(bucket).getPublicUrl(newName).data.publicUrl;
};
