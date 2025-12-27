import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ServiceCard } from "../services/service-card";

export async function ServicesPreview() {
  const services = await prisma.service.findMany({
    where: { active: true },
    take: 3,
    orderBy: { createdAt: "asc" },
  });

  return (
    <section
      id="services"
      className="bg-background w-full py-12 md:py-24 lg:py-32"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Our Services
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              We offer a range of specialized care services tailored to your
              family&apos;s needs.
            </p>
          </div>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <Button asChild variant="ghost" size="lg">
            <Link href="/services">View All Services →</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
