import type { Metadata } from "next";
import { Montserrat, Roboto_Mono } from "next/font/google";
import "./globals.css";
import {Providers} from "./nextUiProvider";
import { AuthSessionProvider } from "./sessionProvider";

export const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
})
 
export const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
})

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
      <body className={`${montserrat.variable} ${roboto_mono.variable}`}>
        <AuthSessionProvider>
          <Providers>
            {children}
          </Providers>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
