"use client";
import useDocument from "@/hooks/useDocument";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { SendReviewDialog } from "./sendReviewDialog";

function SubChildren({ close, execute, getState, textApi, dispatch }: any) {
  const [file, setFile] = useState(null);
  const upload = async () => {
    // const data = new FormData();
    // data.append("file", file as any);

    // const res = await fetch("/api/upload-image", {
    //   method: "POST",
    //   body: data,
    // });
    // const json = await res.json();
    textApi.replaceSelection("![image](https://picsum.photos/200/300)");
  };
  return (
    <div style={{ width: 200, padding: 2 }}>
      <div>上傳圖片</div>
      <Input
        type="file"
        id="file-input"
        accept="image/*"
        onChange={(e: any) => {
          const file = e.target.files[0];
          setFile(file);
        }}
      />
      <Button type="button" onClick={upload}>
        上傳
      </Button>
    </div>
  );
}

const subChild = {
  name: "update",
  groupName: "update",
  icon: (
    <svg viewBox="0 0 1024 1024" width="12" height="12">
      <path
        fill="currentColor"
        d="M716.8 921.6a51.2 51.2 0 1 1 0 102.4H307.2a51.2 51.2 0 1 1 0-102.4h409.6zM475.8016 382.1568a51.2 51.2 0 0 1 72.3968 0l144.8448 144.8448a51.2 51.2 0 0 1-72.448 72.3968L563.2 541.952V768a51.2 51.2 0 0 1-45.2096 50.8416L512 819.2a51.2 51.2 0 0 1-51.2-51.2v-226.048l-57.3952 57.4464a51.2 51.2 0 0 1-67.584 4.2496l-4.864-4.2496a51.2 51.2 0 0 1 0-72.3968zM512 0c138.6496 0 253.4912 102.144 277.1456 236.288l10.752 0.3072C924.928 242.688 1024 348.0576 1024 476.5696 1024 608.9728 918.8352 716.8 788.48 716.8a51.2 51.2 0 1 1 0-102.4l8.3968-0.256C866.2016 609.6384 921.6 550.0416 921.6 476.5696c0-76.4416-59.904-137.8816-133.12-137.8816h-97.28v-51.2C691.2 184.9856 610.6624 102.4 512 102.4S332.8 184.9856 332.8 287.488v51.2H235.52c-73.216 0-133.12 61.44-133.12 137.8816C102.4 552.96 162.304 614.4 235.52 614.4l5.9904 0.3584A51.2 51.2 0 0 1 235.52 716.8C105.1648 716.8 0 608.9728 0 476.5696c0-132.1984 104.8064-239.872 234.8544-240.2816C258.5088 102.144 373.3504 0 512 0z"
      />
    </svg>
  ),
  children: (props: any) => <SubChildren {...props} />,
  buttonProps: { "aria-label": "Insert title" },
};

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

  if (isLoading) return <p>載入文件中...</p>;
  if (error) {
    setTimeout(() => {
      router.push("/documents/me");
    }, 3000);

    return <p>文件載入錯誤，三秒後返回...</p>;
  }

  return (
    <div className="flex flex-col w-full gap-5">
      <div className="w-full flex gap-2 justify-end">
        <Button onClick={handleSave}>儲存</Button>
        <SendReviewDialog documentId={document.id} />
      </div>
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
          value={content}
          onChange={(value) => setContent(value as string)}
          commands={[...commands.getCommands(), commands.group([], subChild)]}
        />
      </div>
    </div>
  );
};

export default DocumentEditor;
