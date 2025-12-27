import { ServiceForm } from "@/components/admin/service-form";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function EditServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const service = await prisma.service.findUnique({
    where: { id },
  });

  if (!service) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/services">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Services
          </Button>
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">Edit Service</h1>
      </div>

      <ServiceForm mode="edit" service={service} />
    </div>
  );
}
