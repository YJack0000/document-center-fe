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


type rowSelectedDocumentInfoType = {
  documentId: string,
  title: string,
  status: string,
  owner: string,
}

type SuperUserDeleteDocumentProps = {
  rowSelectedDocumentInfo: rowSelectedDocumentInfoType[],
  deleteDocumentHandler: () => void
}

export default function SuperUserDeleteDocument( {
  rowSelectedDocumentInfo,
  deleteDocumentHandler
} : SuperUserDeleteDocumentProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>刪除</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>確定是否要刪除以下文件</DialogTitle>
          <DialogDescription>
            Make Sure you want to delete the following document
          </DialogDescription>
        </DialogHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>文件編號</TableHead>
              <TableHead>文件名稱</TableHead>
              <TableHead>文件狀態</TableHead>
              <TableHead>文件擁有者</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rowSelectedDocumentInfo.map((row) => (
              <TableRow key={row.documentId}>
                <TableCell>{row.documentId}</TableCell>
                <TableCell>{row.title}</TableCell>
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
                <TableCell>{row.owner}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="submit" variant="outline" onClick={deleteDocumentHandler}>
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
