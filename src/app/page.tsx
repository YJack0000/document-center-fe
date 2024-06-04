"use client";

import PublicDocumentTableWithPagination from "@/components/documents/public/publicDocumentTableWithPagination";

export default function Home() {
    return (
        <main className="mx-auto px-2 flex justify-center">
            <div className="w-full min-w-[1000px] my-12">
                <h1 className="text-2xl font-bold">公開文件</h1>
                <hr className="my-6 w-full" />
                <PublicDocumentTableWithPagination />
            </div>
        </main>
    );
}
