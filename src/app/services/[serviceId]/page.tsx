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
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface ServicePageProps {
  params: Promise<{
    serviceId: string;
  }>;
}

export async function generateMetadata({ params }: ServicePageProps) {
  const { serviceId } = await params;
  const service = await prisma.service.findUnique({
    where: { id: serviceId },
  });

  if (!service) {
    return {
      title: "Service Not Found - Care.xyz",
      description: "The requested service could not be found.",
    };
  }

  return {
    title: `${service.title} - Professional ${service.category} Service | Care.xyz`,
    description: `${service.description} Book verified caregivers for ${service.title} in Bangladesh. Starting at BDT ${service.baseRate}. Trusted, professional, and reliable care services.`,
    keywords: [
      service.title,
      `${service.category} service`,
      `${service.category} Bangladesh`,
      "professional caregiving",
      "verified caregivers",
      "book caregiver",
      "care services",
      service.category,
    ],
    authors: [{ name: "Care.xyz" }],
    openGraph: {
      title: `${service.title} - Professional ${service.category} Service`,
      description: `${service.description} Book now starting at BDT ${service.baseRate}.`,
      url: `https://care.xyz/services/${serviceId}`,
      siteName: "Care.xyz",
      locale: "en_BD",
      type: "website",
      images: [
        {
          url: "/og-services.jpg",
          width: 1200,
          height: 630,
          alt: `${service.title} - Care.xyz`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.title} - Professional ${service.category} Service`,
      description: `${service.description} Book verified caregivers starting at BDT ${service.baseRate}.`,
      images: ["/og-services.jpg"],
      creator: "@carexyz",
    },
    alternates: {
      canonical: `https://care.xyz/services/${serviceId}`,
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
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { serviceId } = await params;
  const service = await prisma.service.findUnique({
    where: { id: serviceId },
  });

  if (!service) {
    notFound();
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-10">
      <Button variant="ghost" asChild className="mb-6">
        <Link href="/services">← Back to Services</Link>
      </Button>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="space-y-6 md:col-span-2">
          <div>
            <h1 className="mb-2 text-4xl font-bold">{service.title}</h1>
            <p className="text-muted-foreground text-xl capitalize">
              {service.category} Category
            </p>
          </div>

          <div className="prose dark:prose-invert max-w-none">
            <h3 className="mb-4 text-2xl font-semibold">About this Service</h3>
            <p className="text-lg leading-relaxed">{service.description}</p>

            <h3 className="mt-8 mb-4 text-2xl font-semibold">What to Expect</h3>
            <ul className="space-y-2">
              {[
                "Verified Professional Caregivers",
                "24/7 Support Available",
                "Real-time Updates",
                "Secure Payment Processing",
                "Satisfaction Guaranteed",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Booking Summary</CardTitle>
              <CardDescription>Simple pricing, no hidden fees.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-2 text-3xl font-bold">
                BDT {service.baseRate}{" "}
                <span className="text-muted-foreground text-sm font-normal">
                  / unit
                </span>
              </div>
              <p className="text-muted-foreground mb-4 text-sm">
                * Unit usually refers to per hour or per day depending on
                service type.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Service Fee</span>
                  <span>included</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>included</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full" size="lg">
                <Link href={`/booking/${service.id}`}>Book Now</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
