import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { env } from "../../../env";

export async function requireAuth() {
  const { userId } = await auth();
  if (!userId) redirect("/");
  return userId;
}

export async function requireUserProfile() {
  try {
    const user = await currentUser();
    if (!user) return null;

    return {
      id: user.id,
      imageUrl: user.imageUrl,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.emailAddresses[0]?.emailAddress || null,
    };
  } catch {
    return null;
  }
}

export async function getOptionalAuth(): Promise<string | null> {
  try {
    const { userId } = await auth();
    return userId || null;
  } catch {
    return null;
  }
}

export async function requireAdminAuth() {
  const userId = await requireAuth();
  if (userId !== env.ADMIN_USER_ID) redirect("/");
  return userId;
}

export async function requireUserWithEmail() {
  const user = await currentUser();
  if (!user) redirect("/");

  return {
    id: user.id,
    email: user.emailAddresses[0]?.emailAddress,
    firstName: user.firstName,
    lastName: user.lastName,
    // Add other fields you commonly need for orders
    phone: user.phoneNumbers[0]?.phoneNumber || null,
    imageUrl: user.imageUrl,
  };
}
