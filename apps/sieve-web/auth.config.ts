// import SpotifyProvider from "next-auth/providers/spotify"

// export const AuthConfig = {
//     secret: process.env.AUTH_SECRET,
//     pages: {
//         signIn: '/login'
//     },
//     callbacks: {
//         authorized({ auth, request: { nextUrl }}): boolean | Response {
//             const isLoggedIn = !!auth?.user;
//             const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
//             if (isOnDashboard) {
//                 return !!isLoggedIn;
//             } else if (isLoggedIn) {
//                 return Response.redirect(new URL('/dashboard', nextUrl));
//             }
//             return true;
//         }
//     },
//     providers: [
//         SpotifyProvider({
//             clientId: process.env.SPOTIFY_ID ?? '',
//             clientSecret: process.env.SPOTIFY_SECRET ?? '',
//       }),
//     ],
// }

export const pages = {
  signIn: "/login",
  error: "/error",
};
