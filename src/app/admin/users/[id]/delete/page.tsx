import { DeleteUserClient } from "@/components/admin/delete-user-client";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function DeleteUserPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      _count: {
        select: { bookings: true },
      },
    },
  });

  if (!user) {
    notFound();
  }

  return <DeleteUserClient user={user} />;
}
