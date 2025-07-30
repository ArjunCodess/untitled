import { Inter } from "next/font/google";
import "./globals.css";
import { constructMetadata } from "@/lib/utils";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata = constructMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="overflow-x-hidden">
      <body className={inter.className} suppressHydrationWarning>
        {children}
      </body>
      <Script
        defer
        data-domain="whisperstomishika.vercel.app"
        src="https://getanalyzr.vercel.app/tracking-script.js"
      />
    </html>
  );
}