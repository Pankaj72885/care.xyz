import { ServiceList } from "@/components/services/service-list";
import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Care Services - Elderly Care, Baby Sitting & Nursing | Care.xyz",
  description:
    "Explore our professional caregiving services in Bangladesh. Choose from elderly care, baby sitting, nursing, and specialized care services. All caregivers are verified, background-checked, and highly skilled. Book trusted care for your loved ones today.",
  keywords: [
    "care services Bangladesh",
    "elderly care services",
    "baby sitting Bangladesh",
    "nursing services",
    "home care services",
    "caregiver services",
    "senior care",
    "childcare Bangladesh",
    "professional caregivers",
    "verified care providers",
    "nursing care",
    "special needs care",
  ],
  authors: [{ name: "Care.xyz" }],
  openGraph: {
    title: "Our Care Services - Professional Caregiving in Bangladesh",
    description:
      "Browse verified elderly care, baby sitting, and nursing services. Quality care from background-checked professionals.",
    url: "https://care.xyz/services",
    siteName: "Care.xyz",
    locale: "en_BD",
    type: "website",
    images: [
      {
        url: "/og-services.jpg",
        width: 1200,
        height: 630,
        alt: "Care.xyz Services - Elderly Care, Baby Sitting & Nursing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Care Services - Professional Caregiving in Bangladesh",
    description:
      "Explore elderly care, baby sitting, and nursing services from verified professionals.",
    images: ["/og-services.jpg"],
    creator: "@carexyz",
  },
  alternates: {
    canonical: "https://care.xyz/services",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const dynamic = "force-dynamic";

export default async function ServicesPage() {
  const services = await prisma.service.findMany({
    where: { active: true },
    orderBy: { createdAt: "asc" },
  });

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-zinc-950">
      {/* Header */}
      <div className="mb-10 border-b bg-white py-12 md:py-20 dark:bg-zinc-900">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Our Professional Services
          </h1>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            Browse our wide range of caregiving services. From elderly care to
            physiotherapy, we connect you with verified professionals in
            Bangladesh.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-20">
        <ServiceList services={services} />
      </div>
    </div>
  );
}
