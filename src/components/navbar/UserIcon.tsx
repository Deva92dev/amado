/* eslint-disable @next/next/no-img-element */
import { currentUser } from "@clerk/nextjs/server";
import { LuUser } from "react-icons/lu";

const UserIcon = async () => {
  const user = await currentUser();
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
    <LuUser className="w-6 h-6 bg-primary rounded-full text-white cursor-pointer" />
  );
};

export default UserIcon;
