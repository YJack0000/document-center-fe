"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/sidebar";
import { useEffect, useState } from "react";
import UserContext from "@/context/userContext";
import { useRouter } from "next/navigation";
import { verifyJwt } from "@/lib/utils";
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
      // from cookie read access token
      // if access token is valid, set user
      // else redirect to login
      let findUser = false;
      document.cookie.split(";").forEach((cookie) => {
        const [key, value] = cookie.split("=");
        if (key === "access_token") {
          const user = verifyJwt(value);
          if (user) {
            findUser = true;
            setUser(verifyJwt(value));
            router.push("/");
          }
        }
      });
      if (!findUser) {
        router.push("/login");
      }
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
