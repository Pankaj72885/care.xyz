import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Service } from "@prisma/client";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Card className="group hover:border-primary/50 flex flex-col overflow-hidden border-2 bg-white transition-all hover:shadow-xl dark:bg-zinc-950">
      {/* Image Section */}
      <div className="relative aspect-video w-full overflow-hidden bg-gray-100 dark:bg-zinc-900">
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
            className="bg-white/90 font-semibold shadow-sm backdrop-blur-sm dark:bg-zinc-900/90"
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
        <p className="line-clamp-3 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
          {service.description}
        </p>

        <div className="mt-4 flex items-center gap-2 text-xs font-medium text-gray-500 dark:text-gray-500">
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
          <Button
            asChild
            size="sm"
            className="gap-2 rounded-full px-4 text-xs font-semibold"
          >
            <Link href={`/services/${service.id}`}>
              Book Now <ArrowRight className="h-3 w-3" />
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
