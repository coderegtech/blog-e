import { ModalProvider } from "@/providers/ModalProvider";
import { SessionProvider } from "@/providers/SessionProvider";
import StoreProvider from "@/providers/StoreProvider";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BlogE",
  description: "A simple blog app for assessment project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StoreProvider>
          <SessionProvider>
            <ModalProvider>{children}</ModalProvider>
          </SessionProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
