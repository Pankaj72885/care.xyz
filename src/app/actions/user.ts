"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function getCurrentUser() {
  const session = await auth();

  if (!session?.user) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      nid: true,
      contact: true,
      image: true,
      division: true,
      district: true,
      upazila: true,
      address: true,
    },
  });

  return user;
}
