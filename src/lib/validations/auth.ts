import { z } from "zod";

export const registerSchema = z.object({
  nid: z
    .string()
    .min(10, "NID must be at least 10 characters")
    .max(20, "NID is too long")
    .optional(),
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  contact: z
    .string()
    .min(6, "Contact must be valid")
    .max(20, "Contact too long")
    .optional(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type RegisterInput = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export type LoginInput = z.infer<typeof loginSchema>;
