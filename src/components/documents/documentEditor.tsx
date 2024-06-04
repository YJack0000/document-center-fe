"use client";
import useDocument from "@/hooks/useDocument";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import "../index.css";

const DocumentEditor = ({ documentId }: { documentId: string }) => {
  const router = useRouter();
  const { document, error, isLoading } = useDocument(documentId);
  const [title, setTitle] = useState(document?.title);
  const [content, setContent] = useState(document?.content);

  useEffect(() => {
    setTitle(document?.title);
    setContent(document?.content);
  }, [document]);

  const handleSave = async () => {
    await fetch(`/api/documents/${documentId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content }),
    });
    router.push("/documents/me");
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="flex flex-col w-full gap-5">
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="id">文件ID</Label>
        <Input id="id" type="text" value={document.id} disabled />
      </div>

      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="title">標題</Label>
        <Input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="id">內文</Label>
        <MDEditor
          className="markdown-list"
          value={content}
          onChange={(value) => setContent(value as string)}
        />
      </div>
      <p>{document.status}</p>
      <Button onClick={handleSave}>儲存</Button>
    </div>
  );
};

export default DocumentEditor;
