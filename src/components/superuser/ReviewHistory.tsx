import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


type reviewHistoryDataType = {
  documentId: string,
  reviewId: string,
  reviewerName: string,
  status: string,
  createAt: string,
}

async function fetchReviewHistoryData({documentId}: {documentId: string}) {
  const response = await fetch(`/api/reviews/${documentId}`)
  const data = await response.json()
  return data
}

export default function SuperUserAllDocumnetShowReviewDialog({documentId}: {documentId: string}) {
  const [historyData, setHistoryData] = useState<reviewHistoryDataType[]>([])
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">審核紀錄</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[650px]">
        <DialogHeader>
          <DialogTitle>Review History: {documentId}</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>文件編號</TableHead>
              <TableHead>審核者編號</TableHead>
              <TableHead>審核者名稱</TableHead>
              <TableHead>審核狀態</TableHead>
              <TableHead>時間點</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {historyData.map((row) => (
              <TableRow key={row.reviewId}>
                <TableCell>{row.documentId}</TableCell>
                <TableCell>{row.reviewId}</TableCell>
                <TableCell>{row.reviewerName}</TableCell>
                <TableCell>
                  <>
                      {row.status === "pass" ? (
                        <span className="px-2 py-1 text-xs font-semibold text-white bg-green-500 rounded-full">
                          {row.status}
                        </span>
                      ) : row.status === "reject" ? (
                        <span className="px-2 py-1 text-xs font-semibold text-white bg-red-500 rounded-full">
                          {row.status}
                        </span>
                      ) : row.status === "review" ? (
                        <span className="px-2 py-1 text-xs font-semibold text-white bg-yellow-500 rounded-full">
                          {row.status}
                        </span>
                      ) : (
                        <span className="px-2 py-1 text-xs font-semibold text-white bg-blue-500 rounded-full">
                          {row.status}
                        </span>
                      )}
                    </>
                </TableCell>
                <TableCell>{row.createAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <DialogFooter>
            <DialogClose asChild>
                <Button variant="outline">Close</Button>
            </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
