"use client";

import { useState } from "react";
import { useAuthUser } from "@/lib/clerk/authClient";
import { uploadVideoAction } from "@/utils/actions";

const VideoUploader = () => {
  const { user } = useAuthUser();
  const userId = user?.id as string;
  const [uploading, setUploading] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    setUploading(true);
    try {
      if (userId) {
        const url = await uploadVideoAction(
          e.target.files[0],
          "videos",
          userId
        );
        setVideoUrl(url);
      }
    } catch (error) {
      console.error("Upload failed", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="video/mp4,video/webm"
        onChange={handleFileChange}
      />
      {uploading && <p>Uploading video...</p>}
      {videoUrl && <video src={videoUrl} controls width={400} />}
    </div>
  );
};

export default VideoUploader;
