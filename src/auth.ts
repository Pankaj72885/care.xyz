import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

import { authConfig } from "./auth.config";
import { prisma } from "./lib/prisma";
import { loginSchema } from "./lib/validations/auth";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
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
    async jwt({ token, user, account }) {
      // On sign in (when user object is present)
      if (user) {
        token.role = user.role || "USER";
      }

      // For OAuth users on first sign in, fetch role from database
      if (account && !token.role && token.sub) {
        const dbUser = await prisma.user.findUnique({
          where: { id: token.sub },
          select: { role: true },
        });
        if (dbUser) {
          token.role = dbUser.role;
        } else {
          token.role = "USER"; // Default role
        }
      }

      return token;
    },
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true, // Allow linking if email matches
    }),
    Credentials({
      async authorize(credentials) {
        const validatedFields = loginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await prisma.user.findUnique({
            where: { email },
          });

          if (!user || !user.passwordHash) return null;

          const passwordsMatch = await bcrypt.compare(
            password,
            user.passwordHash
          );

          if (passwordsMatch) {
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
              image: user.image,
            };
          }
        }

        return null;
      },
    }),
  ],
});
