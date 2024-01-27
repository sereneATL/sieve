import SpotifyProvider from "next-auth/providers/spotify";

import NextAuth, { AuthOptions } from "next-auth";

import { pages } from "@/sieve-web/auth.config";

const authOptions: AuthOptions = {
  secret: process.env.AUTH_SECRET,
  pages,
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_ID ?? "",
      clientSecret: process.env.SPOTIFY_SECRET ?? "",
    }),
  ],
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
