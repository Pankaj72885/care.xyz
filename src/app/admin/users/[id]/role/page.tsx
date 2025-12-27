import { UserRoleForm } from "@/components/admin/user-role-form";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function UserRolePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  });

  if (!user) {
    notFound();
  }

  return <UserRoleForm user={user} />;
}
