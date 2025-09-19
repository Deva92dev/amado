import VideoUploader from "@/components/global/VideoUploader";

export default async function UploadVideoPage() {
  return (
    <main className="p-8">
      <h1 className="mb-6 text-2xl font-semibold">Upload Videos</h1>
      <VideoUploader />
    </main>
  );
}
