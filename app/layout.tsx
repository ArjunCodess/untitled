import { Inter } from "next/font/google";
import "./globals.css";
import { constructMetadata } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata = constructMetadata();

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning className="overflow-x-hidden">
            <body className={inter.className} suppressHydrationWarning>{children}</body>
        </html>
    );
}