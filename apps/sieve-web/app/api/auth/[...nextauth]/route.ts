import SpotifyProvider from "next-auth/providers/spotify";

import NextAuth, { AuthOptions } from "next-auth";

import { pages } from "@/sieve-web/auth.config";
import { JWT } from "next-auth/jwt/types";

const scopes = ["user-read-private", "user-read-email", "user-top-read"].join(
  ",",
);

const params = {
  scope: scopes,
};

const LOGIN_URL =
  "https://accounts.spotify.com/authorize?" +
  new URLSearchParams(params).toString();

async function refreshAccessToken(token: JWT) {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: token.refreshToken as any,
      client_id: process.env.SPOTIFY_ID ?? "",
    }),
  });

  const data = await response.json();

  return {
    ...token,
    accessToken: data.access_token,
    refreshToken: data.refresh_token ?? token,
    accessTokenExpires: Date.now() + data.expires_in * 1000,
  };
}

const authOptions: AuthOptions = {
  secret: process.env.AUTH_SECRET,
  pages,
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.accessTokenExpires = account.expires_at;
        return token;
      }
      // access token has not expired
      if (
        token.accessTokenExpires &&
        Date.now() < (token.accessTokenExpires as number) * 1000
      ) {
        return token;
      }

      // access token has expired
      return await refreshAccessToken(token);
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_ID ?? "",
      clientSecret: process.env.SPOTIFY_SECRET ?? "",
      authorization: LOGIN_URL,
    }),
  ],
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
