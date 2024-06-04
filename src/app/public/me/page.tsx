"use client"
import MyPublicDocumentTableWithPagination from "@/components/public/myPublicDocumentTableWithPagination"

export default function Page() {
  return (
    <>
      <h1 className="text-2xl font-bold">我的公開文件</h1>
      <hr className="my-6 w-full" />
      <MyPublicDocumentTableWithPagination />
    </>
  )
}
