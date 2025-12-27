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
    ...authConfig.callbacks,
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role as "USER" | "ADMIN";
      }
      if (token.nid && session.user) {
        session.user.nid = token.nid as string;
      }
      if (token.contact && session.user) {
        session.user.contact = token.contact as string;
      }
      return session;
    },
    async jwt({ token, user, account, trigger }) {
      // On sign in (when user object is present)
      if (user) {
        token.role = user.role || "USER";
        token.nid = user.nid;
        token.contact = user.contact;
      }

      // For OAuth users on first sign in, fetch user data from database
      if (account && token.sub) {
        const dbUser = await prisma.user.findUnique({
          where: { id: token.sub },
          select: { role: true, nid: true, contact: true },
        });
        if (dbUser) {
          token.role = dbUser.role;
          token.nid = dbUser.nid;
          token.contact = dbUser.contact;
        } else {
          token.role = "USER";
        }
      }

      // Refresh token data on update trigger
      if (trigger === "update" && token.sub) {
        const dbUser = await prisma.user.findUnique({
          where: { id: token.sub },
          select: { role: true, nid: true, contact: true },
        });
        if (dbUser) {
          token.nid = dbUser.nid;
          token.contact = dbUser.contact;
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
