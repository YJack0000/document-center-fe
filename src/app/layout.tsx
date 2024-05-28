"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/sidebar";
import { useEffect, useState } from "react";
import UserContext from "@/context/userContext";
import { useRouter } from "next/navigation";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user]);
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex">
          <UserContext.Provider value={user}>
            {user && <Sidebar className="w-60 h-screen border" />}
          </UserContext.Provider>
          {children}
        </div>
      </body>
    </html>
  );
}
