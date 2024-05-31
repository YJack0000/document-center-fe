"use client"

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
import { useMemo, useState } from "react"

type ReviewRequestInfo = {
  documentId: string,
  title: string,
  status: string,
  owner: UserInfo,
  originalReviewer: UserInfo | null,
  assignedReviewer: UserInfo | null
}

type SuperUserAssignReviewerProps = {
  reviewRequestList: ReviewRequestInfo[],
  onConfirmChangeReviewers: (requestsInfo: {documentId: string, reviewerId: string}[]) => void
}

export default function SuperUserAssignReviewerBtn( {
  reviewRequestList,
  onConfirmChangeReviewers,
} : SuperUserAssignReviewerProps) {
  // if one of the selected document has no reviewer assigned, then the submit button should be disabled
  const canSubmit = useMemo(() => {
    if (reviewRequestList.length === 0) {
      return false
    }
    return reviewRequestList.every((row) => row.assignedReviewer !== null)
  }, [reviewRequestList])

  const handleClickSubmit = () => {
    const requestsInfo: {documentId: string, reviewerId: string}[] = reviewRequestList.map((row) => {
      if (row.assignedReviewer === null) {
        throw new Error("Some document has no reviewer assigned")
      }

      return {
        documentId: row.documentId,
        reviewerId: row.assignedReviewer.id
      }
    }
    )
    onConfirmChangeReviewers(requestsInfo)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>審核</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>確認送審</DialogTitle>
          <h1>{canSubmit}</h1>
          <DialogDescription>
            請確認以下文件是否需要重新送審
          </DialogDescription>
        </DialogHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>文件編號</TableHead>
              <TableHead>文件名稱</TableHead>
              <TableHead>文件擁有者</TableHead>
              <TableHead>原審核者</TableHead>
              <TableHead>新審核者</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reviewRequestList.map((row) => (
              <TableRow key={row.documentId}>
                <TableCell>{row.documentId}</TableCell>
                <TableCell>{row.title}</TableCell>
                <TableCell>{row.owner.name}</TableCell>
                <TableCell>{row.originalReviewer ? row.originalReviewer.name : "尚未指派"}</TableCell>
                <TableCell>{row.assignedReviewer ? row.assignedReviewer.name : "尚未指派"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <DialogFooter>
          <DialogClose asChild>
            {canSubmit ? (
              <Button type="submit" variant="outline" onClick={handleClickSubmit} >
                確定
              </Button>
            ) : (
              <Button type="submit" variant="outline" disabled>
                有文件尚未指派審核者或是無文件被選取
              </Button>
            )}
          </DialogClose>
          <DialogClose asChild>
            <Button variant="outline">取消</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
