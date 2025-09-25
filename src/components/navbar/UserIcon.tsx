/* eslint-disable @next/next/no-img-element */
import { requireUserProfile } from "@/lib/clerk/authServer";
import { User } from "lucide-react";

const UserIcon = async () => {
  const user = await requireUserProfile();
  const profileImage = user?.imageUrl;
  if (profileImage)
    return (
      <img
        src={profileImage}
        alt="user-icon"
        className="w-6 h-6 rounded-full object-cover"
      />
    );
  return (
    <User className="w-6 h-6 bg-primary rounded-full text-white cursor-pointer" />
  );
};

export default UserIcon;
