import { auth } from "@/auth";
import { CompleteProfileForm } from "@/components/auth/complete-profile-form";
import { redirect } from "next/navigation";

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
