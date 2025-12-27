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
          return { id: "placeholder-user" };
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
      const isAdmin = auth?.user?.role === "ADMIN";

      const isOnAdmin = nextUrl.pathname.startsWith("/admin");
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      const isOnBooking = nextUrl.pathname.startsWith("/booking");
      const isOnPayment = nextUrl.pathname.startsWith("/payment");
      const isOnAuth =
        nextUrl.pathname.startsWith("/login") ||
        nextUrl.pathname.startsWith("/register");

      // Admin routes require ADMIN role
      if (isOnAdmin) {
        if (isLoggedIn && isAdmin) return true;
        return false;
      }

      // Protected routes require authentication
      // Admins should also be able to access dashboard routes (e.g. settings)
      if (isOnDashboard || isOnBooking || isOnPayment) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      }

      // Redirect logged-in users away from auth pages based on role
      if (isLoggedIn && isOnAuth) {
        // Admins go to /admin by default when accessing auth pages, but can go to dashboard if they navigate there
        const redirectUrl = isAdmin ? "/admin" : "/dashboard";
        return Response.redirect(new URL(redirectUrl, nextUrl));
      }

      return true;
    },
    async session({ session, token }) {
      if (token.contact && session.user) {
        session.user.contact = token.contact as string;
      }

      // Failsafe: Ensure the seed admin always has the ADMIN role
      if (session.user?.email === "admin@care.xyz") {
        session.user.role = "ADMIN";
      }

      return session;
    },
  },
} satisfies NextAuthConfig;
