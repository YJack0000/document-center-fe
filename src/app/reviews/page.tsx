"use client"
import ReviewTableWithPagination from "@/components/reviews/reviewTableWithPagination"

export default function Page() {
  return (
    <div className="flex flex-col h-screen p-10 w-full">
      <h1 className="text-4xl font-bold">待簽核文件</h1>
      <hr className="my-6 w-full" />
      <ReviewTableWithPagination />
    </div>
  )
}
