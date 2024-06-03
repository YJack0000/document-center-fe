import DocumentEditor from "@/components/documents/documentEditor";

export default function Page({ params }: { params: { documentId: string } }) {
  return (
    <div className="flex flex-col h-screen p-10 w-full">
      <h1 className="text-4xl font-bold">文件編輯</h1>
      <hr className="my-6 w-full" />
      <DocumentEditor documentId={params.documentId} />
    </div>
  );
}
