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
import { useMemo } from "react"

type RowSelectedDocumentInfoType = {
  documentId: string,
  title: string,
  status: string,
  owner: UserInfo
  assignUser: UserInfo | null
}

type SuperUserDeleteDocumentProps = {
  rowSelectedDocumentInfo: RowSelectedDocumentInfoType[],
  onConfirmDelete: () => void
}

export default function SuperUserDeleteDocument({
  rowSelectedDocumentInfo,
  onConfirmDelete,
}: SuperUserDeleteDocumentProps) {
  const canSubmit = useMemo(() => {
    if (rowSelectedDocumentInfo.length === 0) {
      return false
    }
    return rowSelectedDocumentInfo.every((row) => row.assignUser !== null), [rowSelectedDocumentInfo]
  }, [rowSelectedDocumentInfo])

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button  variant="destructive"
        >刪除</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>刪除文件</DialogTitle>
          <DialogDescription>
            請注意，刪除後將無法復原
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
                  {row.status === "pass" 
                    ? (<span className="px-2 py-1 text-xs font-semibold text-green-600 bg-green-200 rounded-full"> 通過 </span>)
                    : row.status === "reject"
                    ? (<span className="px-2 py-1 text-xs font-semibold text-red-600 bg-red-200 rounded-full"> 拒絕 </span>)
                    : row.status === "review"
                    ? (<span className="px-2 py-1 text-xs font-semibold text-yellow-600 bg-yellow-200 rounded-full"> 審核中 </span>)
                    : row.status === "wait"
                    ? (<span className="px-2 py-1 text-xs font-semibold text-yellow-600 bg-yellow-200 rounded-full"> 等待中 </span>)
                    : row.status === "transfer"
                    ? (<span className="px-2 py-1 text-xs font-semibold text-blue-600 bg-blue-200 rounded-full"> 轉交 </span>)
                    : row.status === "edit"
                    ? (<span className="px-2 py-1 text-xs font-semibold text-gray-600 bg-gray-200 rounded-full"> 編輯中 </span>)
                    : (<span className="px-2 py-1 text-xs font-semibold text-purple-600 bg-purple-200 rounded-full"> {row.status} </span>)}
                  </>
                </TableCell>
                <TableCell>{row.owner.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <DialogFooter>
          <DialogClose asChild>
            {canSubmit ? (
              <Button type="submit" variant="outline" onClick={onConfirmDelete} >
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
