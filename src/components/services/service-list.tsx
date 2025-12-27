"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Service as PrismaService } from "@prisma/client";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// Fallback type in case generated types aren't picked up immediately
type Service = PrismaService & { imageUrl?: string | null };

interface ServiceListProps {
  services: Service[];
}

export function ServiceList({ services }: ServiceListProps) {
  const [filter, setFilter] = useState("All");

  const categories = ["All", ...new Set(services.map((s) => s.category))];

  const filteredServices =
    filter === "All" ? services : services.filter((s) => s.category === filter);

  return (
    <div className="space-y-8">
      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={filter === category ? "default" : "outline"}
            onClick={() => setFilter(category)}
            className="rounded-full px-6"
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredServices.map((service) => (
          <Card
            key={service.id}
            className="group hover:border-primary/50 flex flex-col overflow-hidden border-2 transition-all hover:shadow-xl"
          >
            {/* Image Section */}
            <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
              {service.imageUrl ? (
                <Image
                  src={service.imageUrl}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-gray-400">
                  No Image
                </div>
              )}
              <div className="absolute top-2 right-2">
                <Badge
                  variant="secondary"
                  className="bg-white/90 font-semibold shadow-sm backdrop-blur-sm"
                >
                  {service.category}
                </Badge>
              </div>
            </div>

            <CardHeader className="pb-2">
              <CardTitle className="group-hover:text-primary text-xl font-bold text-gray-900 transition-colors dark:text-gray-100">
                {service.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 pb-4">
              <p className="line-clamp-3 text-sm leading-relaxed text-gray-500">
                {service.description}
              </p>

              <div className="mt-4 flex items-center gap-2 text-xs font-medium text-gray-500">
                <CheckCircle2 className="h-4 w-4 text-green-500" /> Verified
                Professionals
              </div>
            </CardContent>

            <CardFooter className="border-t bg-gray-50/50 p-4 dark:bg-zinc-900/50">
              <div className="flex w-full items-center justify-between">
                <div>
                  <div className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
                    Starts From
                  </div>
                  <div className="text-primary text-lg font-bold">
                    BDT {service.baseRate}{" "}
                    <span className="text-muted-foreground text-xs font-normal">
                      /unit
                    </span>
                  </div>
                </div>
                <Button asChild size="sm" className="gap-2 rounded-full px-4">
                  <Link href={`/services/${service.id}`}>
                    Book Now <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredServices.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-muted-foreground text-lg">
            No services found in this category.
          </p>
          <Button variant="link" onClick={() => setFilter("All")}>
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
}
