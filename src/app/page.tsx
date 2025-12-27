import { Hero } from "@/components/home/hero";
import { Mission } from "@/components/home/mission";
import { ServicesPreview } from "@/components/home/services-preview";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Care.xyz - Caregiving Services in Bangladesh",
  description:
    "Book professional elderly care, baby sitting, and nursing services in Bangladesh. Verified caregivers, flexible scheduling, and secure payments.",
  openGraph: {
    title: "Care.xyz - Your Trusted Caregiving Partner",
    description: "Connect with verified caregivers for your loved ones today.",
    url: "https://care.xyz",
    siteName: "Care.xyz",
    locale: "en_BD",
    type: "website",
  },
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Hero />
      <Mission />
      <ServicesPreview />
    </main>
  );
}
