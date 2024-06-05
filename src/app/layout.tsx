"use client"
import { Inter } from "next/font/google"
import "./globals.css"
import { Sidebar } from "@/components/sidebar"
import { usePathname } from "next/navigation"
import { Toaster } from "@/components/ui/toaster"
import NextTopLoader from "nextjs-toploader"
import { useState } from "react"
import LoadingContext from "@/context/loadingContext"
import Head from "next/head";
import { Loader } from "lucide-react"
const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const [globalLoading, setGlobalLoading] = useState(false)
    const pathname = usePathname()
    // if path is /login, return the login layout
    if (pathname === "/login") {
        return (
            <html lang="en" data-color-mode="light">
                <body className={inter.className}>
                    <div className="flex"> {children}</div>
                </body>
            </html>
        )
    }
    return (
        <html lang="en" data-color-mode="light">
            <Head>
                <title>Document Center</title>
                <meta
                    name="description"
                    content="2024 雲原生與最佳實踐期末專案 - 文件中心 - 第十組"
                />
            </Head>
            <body className={inter.className}>
                <NextTopLoader zIndex={1600} />
                <div className="flex h-[100vh]">
                    <Sidebar className="max-w-60 h-screen border" />
                    <LoadingContext.Provider value={[globalLoading, setGlobalLoading]}>
                        {globalLoading && (
                            <div className="h-[100vh] flex items-center justify-center w-full">
                                <Loader className="m-auto animate-spin" size={64} />
                            </div>
                        )}
                        <div className={`w-full flex ${globalLoading ? "hidden" : ""}`}>
                            {children}
                        </div>
                    </LoadingContext.Provider>
                </div>
                <Toaster />
            </body>
        </html>
    )
}
