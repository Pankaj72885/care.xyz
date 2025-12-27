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
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnAdmin = nextUrl.pathname.startsWith("/admin");
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      const isOnBooking = nextUrl.pathname.startsWith("/booking");
      const isOnPayment = nextUrl.pathname.startsWith("/payment");
      const isOnAuth =
        nextUrl.pathname.startsWith("/login") ||
        nextUrl.pathname.startsWith("/register");

      // Admin routes require ADMIN role
      if (isOnAdmin) {
        if (isLoggedIn && auth?.user?.role === "ADMIN") return true;
        return false;
      }

      // Protected routes require authentication
      if (isOnDashboard || isOnBooking || isOnPayment) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      }

      // Redirect logged-in users away from auth pages
      if (isLoggedIn && isOnAuth) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }

      return true;
    },
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role as "USER" | "ADMIN";
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
