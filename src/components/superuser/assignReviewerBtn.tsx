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

import { reviewerObjType } from './type'


type rowSelectedDocumentAssignInfoType = {
  documentId: string,
  title: string,
  status: string,
  owner: string,
  assignUser: string
}

type SuperUserAssignReviewerProps = {
  rowSelectedDocumentInfo: rowSelectedDocumentAssignInfoType[],
  reviewerObjs: reviewerObjType[]
}

async function selectAssignReviewer({documentId, reviewerId}: {documentId: string, reviewerId: string}) {
    const requestOption = {
        method: 'POST', // PUT?
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            reviewerId,
        }),
    }
    const response = await fetch(`/api/reviews/${documentId}/assign`, requestOption)
}

export default function SuperUserAssignReviewerBtn( {
  rowSelectedDocumentInfo,
  reviewerObjs,
} : SuperUserAssignReviewerProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>審核</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>確定是否重新送審以下文件</DialogTitle>
          <DialogDescription>
            Make sure you want to re-submit the following document
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
            {rowSelectedDocumentInfo.map((row) => (
              <TableRow key={row.documentId}>
                <TableCell>{row.documentId}</TableCell>
                <TableCell>{row.title}</TableCell>
                <TableCell>{row.owner}</TableCell>
                <TableCell>{row.assignUser}</TableCell>
                <TableCell>{reviewerObjs.find((obj) => obj.documentId === row.documentId)?.reviewer}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="submit" variant="outline">
              確定
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant="outline">取消</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
