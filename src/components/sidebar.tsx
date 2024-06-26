"use client"
import { FileText, FileInput, FileStack, BookOpen } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useRouter, usePathname } from "next/navigation"
import { useState, useEffect } from "react"

export function Sidebar({ className }: React.HTMLAttributes<HTMLDivElement>) {
    const router = useRouter()
    const currentPath = usePathname()

    const getPrivilege = async (): Promise<string | null> => {
        const res = await fetch("/api/users/privilege")
        const data = await res.json()
        return data.privilege
    }

    const [privilege, setPrivilege] = useState<string | null>(null)
    useEffect(() => {
        getPrivilege().then(setPrivilege)
    })

    return (
        <div className={cn("pb-12", className)}>
            <div className="space-y-4 py-4 h-full">
                <h1
                    className="text-2xl font-semibold text-center my-4"
                    onClick={() => {
                        router.push("/")
                    }}
                >
                    文件中心
                </h1>
                <div className="px-3">
                    <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                        公開
                    </h2>
                    <div className="space-y-1">
                        <Button
                            variant={currentPath === "/" ? "secondary" : "ghost"}
                            className="w-full justify-start"
                            onClick={() => {
                                router.push("/")
                            }}
                        >
                            <FileText className="mr-2 h-4 w-4" />
                            公開文件
                        </Button>
                    </div>
                </div>
                {privilege ? (
                    <div className="px-3">
                        <div className="space-y-1">
                            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                                個人
                            </h2>
                            <Button
                                variant={currentPath === "/documents/me" ? "secondary" : "ghost"}
                                className="w-full justify-start"
                                onClick={() => {
                                    router.push("/documents/me")
                                }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="mr-2 h-4 w-4"
                                >
                                    <rect width="7" height="7" x="3" y="3" rx="1" />
                                    <rect width="7" height="7" x="14" y="3" rx="1" />
                                    <rect width="7" height="7" x="14" y="14" rx="1" />
                                    <rect width="7" height="7" x="3" y="14" rx="1" />
                                </svg>
                                我的文件
                            </Button>
                            <Button
                                variant={currentPath === "/reviews" ? "secondary" : "ghost"}
                                className="w-full justify-start"
                                onClick={() => router.push("/reviews")}
                            >
                                <FileInput className="mr-2 h-4 w-4" />
                                待簽核文件
                            </Button>
                            <Button
                                variant={currentPath === "/public/me" ? "secondary" : "ghost"}
                                className="w-full justify-start"
                                onClick={() => {
                                    router.push("/public/me")
                                }}
                            >
                                <FileText className="mr-2 h-4 w-4" />
                                過審文件
                            </Button>
                        </div>
                    </div>) : null}
                {privilege === "superuser" ? (
                    <div className="px-3">
                        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                            管理者
                        </h2>
                        <div className="space-y-1">
                            <Button
                                variant={
                                    currentPath === "/superuser/documents" ? "secondary" : "ghost"
                                }
                                className="w-full justify-start"
                                onClick={() => {
                                    router.push("/superuser/documents")
                                }}
                            >
                                <FileStack className="mr-2 h-4 w-4" />
                                所有文件
                            </Button>
                        </div>
                    </div>) : null}
                <div className="px-3">
                    {!privilege ? (
                        <Button
                            className="w-full"
                            variant="outline"
                            onClick={() => router.push("/login")}
                        >
                            登入
                        </Button>
                    ) : (
                        <Button
                            className="w-full"
                            variant="outline"
                            onClick={() => {
                                router.push("/api/auth/logout")
                            }}
                        >
                            登出
                        </Button>)}
                </div>
            </div>
        </div>
    )
}
