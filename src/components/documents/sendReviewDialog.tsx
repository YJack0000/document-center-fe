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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import SuperuserAllDocumnetSelectUser from "../superuser/SelectAssignReviewer"
import { useRouter } from "next/navigation"

export function SendReviewDialog({ documentId }: any) {
  const [reviewer, setReviewer] = useState<UserInfo | null>(null)
  const router = useRouter()
  const handleSend = async () => {
    await fetch(`/api/reviews/${documentId}/assign`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ reviewerId: reviewer?.id }),
    })
    router.push("/documents/me")
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">送出審查</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>選擇審核人</DialogTitle>
          <DialogDescription>
            請選擇審核人以審核此文件，審核人將會收到通知。 送出後不可再修改。
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              審核人
            </Label>
            <SuperuserAllDocumnetSelectUser
              newReviewer={reviewer}
              onReviewerChange={setReviewer}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSend} disabled={reviewer === null}>
            送出
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
