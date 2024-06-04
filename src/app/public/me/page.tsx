"use client"
import MyPublicDocumentTableWithPagination from "@/components/public/myPublicDocumentTableWithPagination"

export default function Page() {
  return (
    <div className="flex flex-col h-screen p-10 w-full">
      <h1 className="text-4xl font-bold">我的公開文件</h1>
      <hr className="my-6 w-full" />
      <MyPublicDocumentTableWithPagination />
    </div>
  )
}
