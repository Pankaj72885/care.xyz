import { DefaultSession } from "next-auth";

declare module "next-auth" {
  // eslint-disable-next-line no-unused-vars
  interface Session {
    user: {
      role: "USER" | "ADMIN";
      nid?: string | null;
      contact?: string | null;
    } & DefaultSession["user"];
  }

  // eslint-disable-next-line no-unused-vars
  interface User {
    role?: "USER" | "ADMIN";
    nid?: string | null;
    contact?: string | null;
  }
}

declare module "next-auth/jwt" {
  // eslint-disable-next-line no-unused-vars
  interface JWT {
    role?: "USER" | "ADMIN";
    nid?: string | null;
    contact?: string | null;
  }
}
