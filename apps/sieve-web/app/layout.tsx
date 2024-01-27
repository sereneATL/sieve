import type { Metadata } from "next";
import { Montserrat, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./nextUiProvider";
import { AuthSessionProvider } from "./sessionProvider";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
  weight: ['400', '700'],
  style: ['normal', 'italic'],
});

const roboto = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto',
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Sieve",
  description: "Sifting sweet connections",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} ${roboto.variable}`}>
        <AuthSessionProvider>
          <Providers>{children}</Providers>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
