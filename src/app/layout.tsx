"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/sidebar";
import { usePathname } from "next/navigation";
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
      <html lang="en">
        <body className={inter.className}>
          <div className="flex"> {children}</div>
        </body>
      </html>
    );
  }
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex">
          <Sidebar className="w-60 h-screen border" />
          {children}
        </div>
      </body>
    </html>
  );
}
