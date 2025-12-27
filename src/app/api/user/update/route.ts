import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

const updateProfileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  nid: z
    .string()
    .optional()
    .refine((val) => !val || /^\d{13}$/.test(val), "NID must be 13 digits"),
  contact: z
    .string()
    .optional()
    .refine((val) => !val || /^\d{11}$/.test(val), "Contact must be 11 digits"),
});

export async function PATCH(req: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { name, nid, contact } = updateProfileSchema.parse(body);

    // Check if NID is being updated and if it's already taken
    if (nid) {
      const existingUserWithNid = await prisma.user.findUnique({
        where: { nid },
      });

      if (existingUserWithNid && existingUserWithNid.id !== session.user.id) {
        return new NextResponse("NID already in use", { status: 409 });
      }
    }

    const user = await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        name,
        nid,
        contact,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error("[USER_UPDATE]", error);
    if (error instanceof z.ZodError) {
      return new NextResponse("Invalid request data", { status: 400 });
    }
    return new NextResponse("Internal Error", { status: 500 });
  }
}
