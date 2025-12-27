import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
  NEXTAUTH_URL: z.string().url().default("http://localhost:3000"),
  NEXTAUTH_SECRET: z.string().min(1, "NEXTAUTH_SECRET is required"),
  GOOGLE_CLIENT_ID: z.string().optional(),
  GOOGLE_CLIENT_SECRET: z.string().optional(),
  STRIPE_PUBLIC_KEY: z.string().optional(),
  STRIPE_SECRET_KEY: z.string().optional(),
  STRIPE_WEBHOOK_SECRET: z.string().optional(),
  RESEND_API_KEY: z.string().optional(),
  APP_BASE_URL: z.string().url().default("http://localhost:3000"),
  APP_ENV: z.enum(["development", "production", "test"]).default("development"),
});

// Validate process.env
// Note: In Next.js, process.env is treated specially.
// We should ensuring we are parsing the correct object.
// For client-side safety, we only export what is safe, but here we export everything
// assuming this file is only used in server contexts or compatible environments.

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error(
    "❌ Invalid environment variables:",
    parsed.error.flatten().fieldErrors
  );
  // Only throw in production or if critical?
  // Next.js build might fail if we throw here and envs aren't present.
  // For now, we'll warm but allow partial if likely dev.
  if (process.env.NODE_ENV === "production") {
    throw new Error("Invalid environment variables");
  }
}

export const env = parsed.success
  ? parsed.data
  : (process.env as unknown as z.infer<typeof envSchema>);
