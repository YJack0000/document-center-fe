'use client';

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const documentId = "f44acfb7-2062-4344-a277-467b541a33e9";

export default function PublicPage() {
  const router = useRouter();

  return (
    <div>
        <h1 className="text-4xl font-bold my-4 w-4/5">Document Title</h1>
        <Button onClick={() => {
            router.push(`/public/documents/id/${documentId}`);
        }}> {documentId} </Button>
    </div>
  );  
}
