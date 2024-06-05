import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react"
import { Textarea } from "../ui/textarea"
import { useRouter } from "next/navigation"

export default function SendReviewDialog({ documentId }: any) {
  const [comment, setComment] = useState<string>("")
  const router = useRouter()
  const handleSend = async () => {
    await fetch(`/api/reviews/${documentId}/pass`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ comment }),
    })
    router.push("/reviews")
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>通過</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>留言</DialogTitle>
          <DialogDescription>
            {/* 請選擇審核人以審核此文件，審核人將會收到通知。 送出後不可再修改。 */}
          </DialogDescription>
        </DialogHeader>
        <Textarea
          className="w-full"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <DialogFooter>
          <Button onClick={handleSend}>通過審核</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
