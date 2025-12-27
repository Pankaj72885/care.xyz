import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";
import Link from "next/link";

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

export default async function ServicesPage() {
  const services = await prisma.service.findMany({
    where: { active: true },
    orderBy: { createdAt: "asc" },
  });

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="mb-8 text-center text-3xl font-bold">Our Services</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <Card key={service.id} className="flex flex-col">
            <CardHeader>
              <CardTitle className="text-xl">{service.title}</CardTitle>
              <CardDescription className="capitalize">
                {service.category}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="text-muted-foreground">{service.description}</p>
              <div className="mt-4 font-semibold">
                Rate: BDT {service.baseRate} / unit
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={`/services/${service.id}`}>View Details</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
