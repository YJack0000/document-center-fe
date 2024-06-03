import { useEffect, useState } from "react"
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

import { format } from 'date-fns';

import useSWR from "swr"
import { use } from "chai"


type reviewHistoryDataType = {
  id: string,
  documentId: string,
  reviewId: string,
  reviewerName: string,
  status: string,
  createdAt: string,
  updatedAt: string
}

type FetchedReviewListPerDocument = PagedWrapper<ReviewInfoDTO>

const fetcher = (url: string) => fetch(url).then(r => r.json())

export default function SuperUserAllDocumnetShowReviewDialog({documentId}: {documentId: string}) {
  const [historyData, setHistoryData] = useState<reviewHistoryDataType[]>([])

  const [shouldFetch, setShouldFetch] = useState(false)

  const enableFetch = () => {
    setShouldFetch(true);
  }

  const { data: fetchReviewHistoryResponse, error } 
      = useSWR<FetchedReviewListPerDocument>(shouldFetch ? `/api/reviews/${documentId}` : null, fetcher)

  useEffect(() => {
    if(fetchReviewHistoryResponse) {
      setHistoryData(fetchReviewHistoryResponse.data.map((row) => {
        return {
          id: row.id,
          documentId: row.documentId,
          reviewId: row.reviewer.id,
          reviewerName: row.reviewer.name,
          status: row.status,
          createdAt: row.createdAt,
          updatedAt: row.updatedAt
        }
      }))
    }
  }, [fetchReviewHistoryResponse]); // Only re-run the effect if data changes
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={enableFetch}>審核紀錄</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[850px]">
        <DialogHeader>
          <DialogTitle>歷史審核紀錄: {documentId}</DialogTitle>
        </DialogHeader>
        <div className="max-h-[500px] overflow-y-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>審核者編號</TableHead>
              <TableHead>審核者名稱</TableHead>
              <TableHead>審核狀態</TableHead>
              <TableHead>送審時間點</TableHead>
              <TableHead>更新時間點</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {historyData.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.reviewId}</TableCell>
                <TableCell>{row.reviewerName}</TableCell>
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
                <TableCell>{format(new Date(row.createdAt), 'MM/dd/yyyy, hh:mm:ss a')}</TableCell>
                <TableCell>{format(new Date(row.updatedAt), 'MM/dd/yyyy, hh:mm:ss a')}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </div>
        {historyData.length === 0 && <DialogDescription className="text-center">尚無審核紀錄</DialogDescription>}
        <DialogFooter>
            <DialogClose asChild>
                <Button variant="outline">Close</Button>
            </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
