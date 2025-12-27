import { auth } from "@/auth";
import { CompleteProfileForm } from "@/components/auth/complete-profile-form";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Complete Your Profile - Care.xyz",
  description:
    "Complete your Care.xyz profile to access all caregiving services.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function CompleteProfilePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  // If user already has NID and contact, redirect to dashboard
  if (session.user.nid && session.user.contact) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <CompleteProfileForm />
    </div>
  );
}
