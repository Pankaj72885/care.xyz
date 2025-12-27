import { UserEditForm } from "@/components/admin/user-edit-form";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function EditUserPage({
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
      contact: true,
      nid: true,
    },
  });

  if (!user) {
    notFound();
  }

  return <UserEditForm user={user} />;
}
