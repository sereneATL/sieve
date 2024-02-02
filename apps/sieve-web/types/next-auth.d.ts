import NextAuth, { DefaultSession } from "next-auth";
import { SessionToken } from "next-auth/core/lib/cookie";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    accessToken: any & DefaultSession["user"];
  }
}
