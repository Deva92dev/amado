/* eslint-disable @next/next/no-img-element */
"use client";
import {
  useUser,
  useAuth,
  SignInButton,
  SignUpButton,
  UserButton,
  SignOutButton,
  SignedIn,
  SignedOut,
  useClerk,
} from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";

export function useAuthUser() {
  const { user, isSignedIn, isLoaded } = useUser();
  const { signOut } = useAuth();

  return {
    user,
    isSignedIn,
    isLoaded,
    signOut,
    userEmail: user?.emailAddresses[0]?.emailAddress || null,
    userImage: user?.imageUrl || null,
    firstName: user?.firstName || null,
    lastName: user?.lastName || null,
    fullName: user ? `${user.firstName} ${user.lastName}`.trim() : null,
  };
}

export function useAuthUserWithLoading() {
  const auth = useAuthUser();

  if (!auth.isLoaded) {
    return { ...auth, loading: true };
  }

  return { ...auth, loading: false };
}

export function useAuthActions() {
  const { signOut } = useAuth();
  const { openSignIn, openUserProfile } = useClerk();
  const router = useRouter();
  const pathname = usePathname();

  const handleSignOut = async () => {
    await signOut({ redirectUrl: pathname || "/" });
  };

  const openSignInModal = () => {
    openSignIn();
  };

  const openProfileModal = () => {
    openUserProfile();
  };

  return {
    handleSignOut,
    openSignInModal,
    openProfileModal,
  };
}

export function AuthSignedIn({
  children,
  ...props
}: {
  children: React.ReactNode;
  [key: string]: any; // Allow any additional props
}) {
  return <SignedIn {...props}>{children}</SignedIn>;
}

export function AuthSignedOut({
  children,
  ...props
}: {
  children: React.ReactNode;
  [key: string]: any;
}) {
  return <SignedOut {...props}>{children}</SignedOut>;
}

export function AuthSignInButton({
  children,
  className = "",
  mode = "modal", // Default is modal
  ...props
}: {
  children?: React.ReactNode;
  className?: string;
  mode?: "modal" | "redirect";
  [key: string]: any;
}) {
  return (
    <SignInButton mode={mode} {...props}>
      {children || (
        <button
          className={`px-4 py-2 bg-gradient-electric text-background rounded ${className}`}
        >
          Sign In
        </button>
      )}
    </SignInButton>
  );
}

export function AuthSignUpButton({
  children,
  className = "",
  mode = "modal",
  ...props
}: {
  children?: React.ReactNode;
  className?: string;
  mode?: "modal" | "redirect";
  [key: string]: any;
}) {
  return (
    <SignUpButton mode={mode} {...props}>
      {children || (
        <button
          className={`px-4 py-2 bg-gradient-electric text-background rounded ${className}`}
        >
          Sign Up
        </button>
      )}
    </SignUpButton>
  );
}

export function AuthSignOutButton({
  children,
  className = "",
  redirectUrl,
  ...props
}: {
  children?: React.ReactNode;
  className?: string;
  redirectUrl?: string;
  [key: string]: any;
}) {
  const pathname = usePathname();
  const finalRedirectUrl = redirectUrl || pathname || "/";

  return (
    <SignOutButton redirectUrl={finalRedirectUrl} {...props}>
      {children || (
        <button
          className={`px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded transition-colors ${className}`}
        >
          Sign Out
        </button>
      )}
    </SignOutButton>
  );
}

export function AuthUserButton({
  className = "",
  showName = false,
  appearance,
  ...props
}: {
  className?: string;
  showName?: boolean;
  appearance?: any; // Clerk's appearance customization
  [key: string]: any;
}) {
  const { fullName } = useAuthUser();

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <UserButton
        appearance={{
          elements: {
            avatarBox: "w-8 h-8",
            userButtonPopoverCard: "shadow-lg border",
            ...appearance?.elements,
          },
          ...appearance,
        }}
        {...props}
      />
      {showName && fullName && (
        <span className="text-sm font-medium text-foreground">{fullName}</span>
      )}
    </div>
  );
}

// (alternative to UserButton)
export function AuthUserMenuButton({
  className = "",
  children,
  ...props
}: {
  className?: string;
  children?: React.ReactNode;
  [key: string]: any;
}) {
  const { userImage, fullName, userEmail } = useAuthUser();

  return (
    <UserButton
      appearance={{
        elements: {
          avatarBox: `w-10 h-10 ${className}`,
          userButtonPopoverCard: "shadow-xl border border-border bg-background",
          userButtonPopoverActions: "bg-muted/50",
        },
      }}
      {...props}
    >
      {children || (
        <div className="flex items-center gap-2">
          {userImage && (
            <img
              src={userImage}
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover"
            />
          )}
          <div className="hidden md:block">
            <div className="text-sm font-medium">{fullName}</div>
            <div className="text-xs text-muted-foreground">{userEmail}</div>
          </div>
        </div>
      )}
    </UserButton>
  );
}
