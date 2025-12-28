import { z } from "zod";

export const registerSchema = z.object({
  nid: z
    .string()
    .regex(/^(\d{10}|\d{13}|\d{17})$/, "NID must be 10, 13, or 17 digits"),
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  contact: z
    .string()
    .min(11, "Contact must be 11 digits")
    .max(11, "Contact must be 11 digits")
    .regex(/^\d+$/, "Contact must contain only numbers"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(/[A-Z]/, "Password must include at least one uppercase letter")
    .regex(/[a-z]/, "Password must include at least one lowercase letter"),
});

export type RegisterInput = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export type LoginInput = z.infer<typeof loginSchema>;
