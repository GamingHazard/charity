import type { Metadata } from "next";
import { Geist, Geist_Mono, Quicksand } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { AuthProvider } from "@/lib/auth-context";
import { DataProvider } from "@/lib/data-context";
import { QueryProvider } from "@/components/providers/query-provider";
import "./globals.css";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });
const quicksand = Quicksand({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Seeds of Love Foundation-UG",
  description:
    "Empowering communities through education, nutrition, and sustainable development",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/dark-logo.jpeg",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/dark-logo.jpeg",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/dark-logo.jpeg",
        type: "image/svg+xml",
      },
    ],
    apple: "/dark-logo.jpeg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={quicksand.className}>
      <body className="font-sans antialiased">
        <QueryProvider>
          <AuthProvider>
            <DataProvider>{children}</DataProvider>
          </AuthProvider>
        </QueryProvider>
        <Analytics />
      </body>
    </html>
  );
}
