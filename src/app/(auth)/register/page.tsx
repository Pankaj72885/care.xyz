import { RegisterForm } from "@/components/auth/register-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register - Care.xyz | Join Our Caregiving Platform",
  description:
    "Create your Care.xyz account to access trusted caregiving services in Bangladesh. Join thousands of families who trust us for elderly care, baby sitting, and nursing services. Quick registration, verified caregivers, and secure platform.",
  keywords: [
    "register care.xyz",
    "create account",
    "sign up caregiving",
    "join care.xyz",
    "caregiver registration",
    "new user Bangladesh",
  ],
  openGraph: {
    title: "Join Care.xyz - Connect with Trusted Caregivers",
    description:
      "Create your account to access professional caregiving services. Quick registration and instant access to verified caregivers.",
    siteName: "Care.xyz",
    locale: "en_BD",
    type: "website",
    images: [
      {
        url: "/og-auth.jpg",
        width: 1200,
        height: 630,
        alt: "Join Care.xyz",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Join Care.xyz - Connect with Trusted Caregivers",
    description:
      "Create your account to access professional caregiving services.",
    images: ["/og-auth.jpg"],
    creator: "@carexyz",
  },
  alternates: {
    canonical: "/register",
  },
};

export default function RegisterPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <RegisterForm />
      </div>
    </div>
  );
}
