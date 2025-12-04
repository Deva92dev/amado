"use client";

import { useToast } from "@/hooks/use-toast";
import { AuthSignOutButton } from "@/lib/clerk/authClient";
import { usePathname } from "next/navigation";

const SignOutLink = () => {
  const { toast } = useToast();
  const pathname = usePathname();
  const handleLogout = () => {
    toast({ description: " Logging out...." });
  };

  return (
    <AuthSignOutButton redirectUrl={pathname || "/"}>
      <button className="w-full text-left" onClick={handleLogout}>
        Log Out
      </button>
    </AuthSignOutButton>
  );
};

export default SignOutLink;
