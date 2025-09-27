import VideoUploader from "@/components/global/VideoUploader";
import { Suspense } from "react";

export default async function UploadVideoPage() {
  return (
    <main className="p-8">
      <h1 className="mb-6 text-2xl font-semibold">Upload Videos</h1>
      <Suspense>
        <VideoUploader />
      </Suspense>
    </main>
  );
}
