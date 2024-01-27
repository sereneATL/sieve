// import NextAuth from "next-auth"
// import { AuthConfig } from "@/sieve-web/auth.config";

// const handler = NextAuth(AuthConfig);
// export { handler as GET, handler as POST };
import SpotifyProvider from "next-auth/providers/spotify"

import NextAuth from 'next-auth';

import { pages } from '@/sieve-web/auth.config';


const handler = NextAuth({
    secret: process.env.AUTH_SECRET,
    pages,
    providers: [
      SpotifyProvider({
          clientId: process.env.SPOTIFY_ID ?? '',
          clientSecret: process.env.SPOTIFY_SECRET ?? '',
    }),
  ],
  });
export { handler as GET, handler as POST };