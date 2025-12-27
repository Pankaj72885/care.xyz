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
import Link from "next/link";

export const metadata = {
  title: "Our Services - Care.xyz",
  description: "Browse our professional caregiving services.",
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
