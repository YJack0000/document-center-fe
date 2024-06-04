"use client";
import PublicDocumentTableWithPagination from "@/components/documents/public/publicDocumentTableWithPagination";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-screen space-y-4 w-full">
      <div className="flex flex-col h-screen p-10 w-full">
        <h1 className="text-4xl font-bold">公開文件</h1>
        <hr className="my-6 w-full" />
        <PublicDocumentTableWithPagination />
      </div>
    </main>
  );
}
