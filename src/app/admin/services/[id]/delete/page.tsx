import { DeleteServiceClient } from "@/components/admin/delete-service-client";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function DeleteServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const service = await prisma.service.findUnique({
    where: { id },
    include: {
      _count: {
        select: { bookings: true },
      },
    },
  });

  if (!service) {
    notFound();
  }

  return <DeleteServiceClient service={service} />;
}
