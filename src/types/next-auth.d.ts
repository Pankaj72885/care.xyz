import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      role: "USER" | "ADMIN";
      nid?: string | null;
      contact?: string | null;
    } & DefaultSession["user"];
  }

  interface User {
    role?: "USER" | "ADMIN";
    nid?: string | null;
    contact?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: "USER" | "ADMIN";
    nid?: string | null;
    contact?: string | null;
  }
}
