import { Hero } from "@/components/home/hero";
import { HowItWorks } from "@/components/home/how-it-works";
import { Mission } from "@/components/home/mission";
import { ServicesPreview } from "@/components/home/services-preview";
import { Testimonials } from "@/components/home/testimonials";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Care.xyz - Professional Caregiving Services in Bangladesh | Elderly Care, Baby Sitting & Nursing",
  description:
    "Book trusted, verified caregivers in Bangladesh. Professional elderly care, baby sitting, and nursing services with background-checked professionals. Flexible scheduling, secure payments, and 24/7 support. Your loved ones deserve the best care.",
  keywords: [
    "caregiving services Bangladesh",
    "elderly care Bangladesh",
    "baby sitting services",
    "nursing care Bangladesh",
    "verified caregivers",
    "professional care services",
    "home care Bangladesh",
    "caregiver booking",
    "trusted caregivers",
    "background checked caregivers",
    "senior care",
    "childcare services",
  ],
  authors: [{ name: "Care.xyz" }],
  openGraph: {
    title: "Care.xyz - Your Trusted Caregiving Partner in Bangladesh",
    description:
      "Connect with verified, compassionate caregivers for elderly care, baby sitting, and nursing services. Quality care you can trust.",
    siteName: "Care.xyz",
    locale: "en_BD",
    type: "website",
    images: [
      {
        url: "/og-home.jpg",
        width: 1200,
        height: 630,
        alt: "Care.xyz - Professional Caregiving Services in Bangladesh",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Care.xyz - Professional Caregiving Services in Bangladesh",
    description:
      "Trusted, verified caregivers for elderly care, baby sitting, and nursing. Book quality care today.",
    images: ["/og-home.jpg"],
    creator: "@carexyz",
  },
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Hero />
      <HowItWorks />
      <ServicesPreview />
      <Mission />
      <Testimonials />
    </main>
  );
}
