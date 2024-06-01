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
              <TableRow key={row.reviewId}>
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
                <TableCell>{format(new Date(row.createdAt), 'MM/dd/yyyy, hh:mm:ss a')}</TableCell>
                <TableCell>{format(new Date(row.updatedAt), 'MM/dd/yyyy, hh:mm:ss a')}</TableCell>
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
