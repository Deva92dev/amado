"use client";

import { useToast } from "@/hooks/use-toast";
import { AuthSignOutButton } from "@/lib/clerk/authClient";

const SignOutLink = () => {
  const { toast } = useToast();
  const handleLogout = () => {
    toast({ description: " Logging out...." });
  };

  return (
    <AuthSignOutButton redirectUrl="/">
      <button className="w-full text-left" onClick={handleLogout}>
        Log Out
      </button>
    </AuthSignOutButton>
  );
};

export default SignOutLink;
