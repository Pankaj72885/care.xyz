import { LoginForm } from "@/components/auth/login-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login - Care.xyz | Access Your Caregiving Account",
  description:
    "Login to your Care.xyz account to book caregiving services, manage bookings, and connect with verified caregivers in Bangladesh. Secure access to professional elderly care, baby sitting, and nursing services.",
  keywords: [
    "login care.xyz",
    "caregiver login",
    "care services login",
    "account access",
    "user login Bangladesh",
  ],
  openGraph: {
    title: "Login to Care.xyz - Your Caregiving Partner",
    description:
      "Access your account to book and manage professional caregiving services in Bangladesh.",
    siteName: "Care.xyz",
    locale: "en_BD",
    type: "website",
    images: [
      {
        url: "/og-auth.jpg",
        width: 1200,
        height: 630,
        alt: "Login to Care.xyz",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Login to Care.xyz",
    description: "Access your caregiving services account.",
    images: ["/og-auth.jpg"],
    creator: "@carexyz",
  },
  alternates: {
    canonical: "/login",
  },
};

export default function LoginPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
