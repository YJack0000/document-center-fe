"use client"
import ReviewTableWithPagination from "@/components/reviews/reviewTableWithPagination"

export default function Page() {
    return (
        <>
            <h1 className="text-2xl font-bold">待簽核文件</h1>
            <hr className="my-6 w-full" />
            <ReviewTableWithPagination />
        </>
    )
}
