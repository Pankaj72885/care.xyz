"use server";

import { prisma } from "@/lib/prisma";
import { RegisterInput, registerSchema } from "@/lib/validations/auth";
import bcrypt from "bcryptjs";

export async function registerUser(data: RegisterInput) {
  const result = registerSchema.safeParse(data);

  if (!result.success) {
    return { error: "Invalid input data" };
  }

  const { name, email, password, contact, nid } = result.data;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { error: "User already exists with this email" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        name,
        email,
        passwordHash: hashedPassword,
        contact,
        nid,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Registration error:", error);
    return { error: "Something went wrong. Please try again." };
  }
}
