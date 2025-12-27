import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

import { loginSchema } from "@/lib/validations/auth";

export const authConfig = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const validatedFields = loginSchema.safeParse(credentials);
        if (validatedFields.success) {
          return {
            id: "user-id-placeholder", // We'll handle verifying logic in the main auth.ts to keep this edge-compatible if needed, or simply do it here if we assume Node.js runtime.
            // In pure NextAuth v5, database checks usually happen here.
            // However, since we need bcrypt, we might keep the heavy logic in auth.ts if separating for Edge.
            // For simplicity in this Node/Bun setup, we'll implement fully in auth.ts and just define providers here essentially?
            // Actually, let's keep it clean. We'll just export the config object type here or minimal config.
            // A common pattern is to put providers in auth.ts if they rely on Node-only libs (bcrypt).
            ...validatedFields.data,
          } as any;
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
    newUser: "/register",
    error: "/login", // Error code passed in url string
  },
} satisfies NextAuthConfig;
