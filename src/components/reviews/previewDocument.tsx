"use client"
import useDocument from "@/hooks/useDocument"
import { Label } from "@/components/ui/label"
import MarkdownPreview from "@uiw/react-markdown-preview"
import remarkGfm from "remark-gfm"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"
import PassDialog from "./passDialog"
import RejectDialog from "./rejectDialog"

const SignDocumentViewer = ({ documentId }: { documentId: string }) => {
  const router = useRouter()
  const { document, error, isLoading } = useDocument(documentId)

  if (isLoading) return <p>載入文件中...</p>
  if (error) {
    setTimeout(() => {
      router.push("/reviews/me")
    }, 3000)

    return <p>文件載入錯誤，三秒後返回...</p>
  }

  return (
    <div className="flex flex-col w-full gap-5">
      <div className="w-full flex gap-2 justify-end">
        <PassDialog documentId={document.id} />
        <RejectDialog documentId={document.id} />
      </div>
      <table className="w-full ">
        <tr>
          <th className="text-left">文件ID</th>
          <th className="text-left">{document.id}</th>
        </tr>
        <tr>
          <th className="text-left">文件擁有者</th>
          <th className="text-left">{document.owner.name}</th>
        </tr>
        <tr>
          <th className="text-left">標題</th>
          <th className="text-left">{document.title}</th>
        </tr>
      </table>

      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="id">內文</Label>
        <MarkdownPreview
          remarkPlugins={[remarkGfm]}
          source={document.content}
          className="markdown-list min-w-[700px] max-w-[800px]"
        />
      </div>
    </div>
  )
}

export default SignDocumentViewer
