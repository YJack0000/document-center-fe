'use client';

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import DocumentTableWithPagination from "@/components/documents/documentTableWithPagination";

const documentId = "f44acfb7-2062-4344-a277-467b541a33e9";

export default function PublicPage() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <div className="flex flex-col h-screen p-10 w-full">
        <h1 className="text-4xl font-bold">公開文件</h1>
        <hr className="my-6 w-full" />
        <DocumentTableWithPagination type="public_all" />
      </div>
    </div>
  );  
}
