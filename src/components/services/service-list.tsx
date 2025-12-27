"use client";

import { Button } from "@/components/ui/button";
import { Service as PrismaService } from "@prisma/client";
import { useState } from "react";
import { ServiceCard } from "./service-card";

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
          <ServiceCard key={service.id} service={service} />
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
