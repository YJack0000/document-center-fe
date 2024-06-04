"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/sidebar";
import { usePathname } from "next/navigation";
import { Toaster } from "@/components/ui/toaster";
import NextTopLoader from 'nextjs-toploader';
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const pathname = usePathname();
    // if path is /login, return the login layout
    if (pathname === "/login") {
        return (
            <html lang="en" data-color-mode="light">
                <body className={inter.className}>
                    <div className="flex"> {children}</div>
                </body>
            </html>
        );
    }
    return (
        <html lang="en" data-color-mode="light">
            <body className={inter.className}>
                <NextTopLoader zIndex={1600} />
                <div className="flex h-[100vh]">
                    <Sidebar className="max-w-60 h-screen border" />
                    {children}
                </div>
                <Toaster />
            </body>
        </html>
    );
}
