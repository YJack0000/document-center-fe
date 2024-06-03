"use client"

import * as React from "react"
import { useEffect, useState } from "react"
import {
  ColumnDef,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import {
  ChevronDown,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"


import SuperUserAllDocumnetSelectUser from "./SelectAssignReviewer"
import SuperUserAllDocumnetShowReviewDialog from "./ReviewHistory"
import { format } from 'date-fns';
import SuperUserDeleteDocumentButton from "./DeleteDocumentButton"
import SuperUserAssignReviewerButton from "./AssignReviewerButton"
import RowSortingBtn from "./RowSortingBtn"

import useSWR, { useSWRConfig } from "swr"

const PAGE_SIZE = 2

type FetchedAllDocumentList = PagedWrapper<DocumentDTO>
type FetchedReviewListPerDocument = PagedWrapper<ReviewInfoDTO>

type SuperuserAllDocumnetTableRow = {
  documentId: string,
  title: string,
  status: string,
  createdAt: string,
  editedAt: string,
  reviewedAt: string | null,
  owner: UserInfo
  reviewer: UserInfo | null,
  newReviewer: UserInfo | null
}

function convertToSuperuserTableRow(data: DocumentDTO): SuperuserAllDocumnetTableRow {
  return {
    documentId: data.id,
    title: data.title,
    status: data.status,
    owner: {
      id: data.owner.id,
      name: data.owner.name
    },
    createdAt: data.createAt,
    editedAt: data.updateAt,
    reviewedAt: null,
    reviewer: null,
    newReviewer: null
  }
}

const fetcher = (url: string) => fetch(url).then(r => r.json())

export default function SuperUserAllDocumnetTable() {

  const { mutate } = useSWRConfig()

  const [pageIdx, setPageIdx] = useState(1)
  const [lastPageIdx, setLastPageIdx] = useState(1)

  const { data, isLoading, error }
    = useSWR<FetchedAllDocumentList>(`/api/documents/all?page=${pageIdx}&limit=${PAGE_SIZE}`,
      fetcher)
  const [tableData, setTableData] = useState<SuperuserAllDocumnetTableRow[]>([])

  useEffect(() => {
    if (data) {
      setTableData(data.data.map((document: DocumentDTO) => convertToSuperuserTableRow(document)))
      setLastPageIdx(data.totalPage)
    }
  }, [data])


  const multipleFetcher = async (urls: string | string[]) => {
    if (Array.isArray(urls)) {
      const responses = await Promise.all(urls.map(url => fetch(url).then(r => r.json())))
      return await responses
    }
    const response = await fetch(urls).then(r => r.json())
    return await response
  }
  // Create a key for each item in tableData
  const keys = tableData.map((data) => `/api/reviews/${data.documentId}`)
  // Fetch the data for each key
  const { data: reviewHistories, error: reviewError, mutate: updateReviewListDoc } = useSWR<FetchedReviewListPerDocument[]>(keys, multipleFetcher);

  useEffect(() => {
    if (reviewHistories) {
      // console.log("Review histories")
      const tableDataWithReviews = tableData.map((data, idx) => {
        const reviewData = reviewHistories[idx]
        if (reviewData.data.length === 0) {
          return data
        }

        const lastReviewer = reviewData.data[0] // order is by desc
        return {
          ...data,
          reviewedAt: lastReviewer.createdAt,
          reviewer: lastReviewer.reviewer
        }
      })
      setTableData(tableDataWithReviews)
    }
  }, [reviewHistories])


  const handleChangeReviewer = (documentId: string, reviewer: UserInfo | null) => {
    // change reviewer info in tableData
    setTableData((tableData) => {
      return tableData.map((data) => {
        if (data.documentId === documentId) {
          if (reviewer === null) {
            return {
              ...data,
              newReviewer: null
            }
          }
          return {
            ...data,
            newReviewer: {
              id: reviewer.id,
              name: reviewer.name
            }
          }
        }
        return data
      })
    })
  }

  const columns: ColumnDef<SuperuserAllDocumnetTableRow>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      id: "文件編號",
      accessorKey: "documentId",
      header: ({ column }) => {
        return (
          <RowSortingBtn column={column} header="文件編號" />
        )
      },
      cell: ({ row }) => {
        return (
          <div className="ml-5">{row.original.documentId}</div>
        )
      }
    },
    {
      id: "標題",
      accessorKey: "title",
      header: "標題",
      cell: ({ row }) => {
        return (
          <div className="min-w-[10rem]">{row.original.title}</div>
        )
      }
    },
    {
      id: "狀態",
      accessorKey: "status",
      header: "狀態",
      cell: ({ row }) => {
        const status = row.original.status.toLowerCase()
        return (
          <>
            {status === "pass"
              ? (<span className="px-2 py-1 text-xs font-semibold text-green-600 bg-green-200 rounded-full"> 通過 </span>)
              : status === "reject"
                ? (<span className="px-2 py-1 text-xs font-semibold text-red-600 bg-red-200 rounded-full"> 拒絕 </span>)
                : status === "review"
                  ? (<span className="px-2 py-1 text-xs font-semibold text-yellow-600 bg-yellow-200 rounded-full"> 審核中 </span>)
                  : status === "wait"
                    ? (<span className="px-2 py-1 text-xs font-semibold text-yellow-600 bg-yellow-200 rounded-full"> 等待中 </span>)
                    : status === "transfer"
                      ? (<span className="px-2 py-1 text-xs font-semibold text-blue-600 bg-blue-200 rounded-full"> 轉交 </span>)
                      : status === "edit"
                        ? (<span className="px-2 py-1 text-xs font-semibold text-gray-600 bg-gray-200 rounded-full"> 編輯中 </span>)
                        : (<span className="px-2 py-1 text-xs font-semibold text-purple-600 bg-purple-200 rounded-full"> {status} </span>)}
          </>
        )
      }
    },
    {
      id: "所有者",
      accessorKey: "owner",
      header: ({ column }) => {
        return (
          <RowSortingBtn column={column} header="所有者" />
        )
      },
      cell: ({ row }) => {
        return (
          <div className="text-center">{row.original.owner.name}</div>
        )
      }
    },
    {
      id: '建立-修改-日期',
      header: ({ column }) => {
        return (
          <div>建立日期 / 修改日期</div>
        )
      },
      cell: ({ row }) => {
        const { createdAt, editedAt } = row.original
        const [createDate, editDate] = [createdAt, editedAt].map(date => format(new Date(date), 'MM/dd/yyyy'))
        return (
          <div> {createDate} / {editDate}</div>
        )
      }
    },
    {
      id: "近期審核日期",
      accessorKey: "reviewAt",
      header: "近期審核日期",
      cell: ({ row }) => {
        if (row.original.reviewedAt === null) {
          return (
            <div>無</div>
          )
        }

        return (
          <div>{format(new Date(row.original.reviewedAt), 'MM/dd/yyyy')}</div>
        )
      }
    },
    {
      id: "原審核者",
      accessorKey: "reviewer",
      header: "原審核者",
      cell: ({ row }) => {
        if (row.original.reviewer === null) {
          return (
            <div>無</div>
          )
        }
        return (
          <div>{row.original.reviewer.name}</div>
        )
      }
    },
    {
      id: "指定新審核者",
      accessorKey: "newReviewer",
      header: ({ column }) => (
        <div className="w-20">指定新審核者</div>
      ),
      cell: ({ row }) => {


        return (
          <SuperUserAllDocumnetSelectUser
            newReviewer={row.original.newReviewer}
            onReviewerChange={(newReviewer: UserInfo | null) => handleChangeReviewer(row.original.documentId, newReviewer)}
          />
        )
      },
    },
    {
      id: "審核紀錄",
      cell: ({ row }) => {
        return (
          <SuperUserAllDocumnetShowReviewDialog documentId={row.original.documentId} />
        )
      }
    }
  ]

  const [columnVisibility, setColumnVisibility] =
    useState<VisibilityState>({
      "文件編號": false,
    })
  const [rowSelection, setRowSelection] = useState({})


  const changeReviewerFetcher = async (requestsInfo: { documentId: string, reviewerId: string }[]) => {
    const responses = await Promise.all(requestsInfo.map(request => {
      fetch(`/api/reviews/${request.documentId}/assign`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          reviewerId: request.reviewerId
        })
      })
    }))
    return responses
  }

  const handleChangeReviewers = (requestsInfo: { documentId: string, reviewerId: string }[]) => {
    console.log("Change reviewer")

    changeReviewerFetcher(requestsInfo).then(() => {
      console.log("Change reviewer success")
      requestsInfo.forEach(request => {
        updateReviewListDoc()
      })
      console.log("Mutate success")
    }).catch((error) => {
      console.log("Change reviewer error", error)
    })
    setRowSelection({})
  }

  const getRowSelectedReviewRequestList = () => {
    return table.getSelectedRowModel().rows.map((row) => {
      return {
        "documentId": row.original.documentId,
        "title": row.original.title,
        "status": row.original.status,
        "owner": row.original.owner,
        "originalReviewer": row.original.reviewer,
        "assignedReviewer": row.original.newReviewer
      }
    })
  }

  const getRowSelectedDocumentInfoList = () => {
    return table.getSelectedRowModel().rows.map((row) => {
      return {
        "documentId": row.original.documentId,
        "title": row.original.title,
        "status": row.original.status,
        "owner": row.original.owner,
        "assignUser": row.original.newReviewer
      }
    })
  }

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      columnVisibility,
      rowSelection,
    },
    initialState: {
      pagination: {
        pageSize: PAGE_SIZE
      }
    }
  })

  const deleteDocumentFetcher = async (documentId: string[]) => {
    const responses = await Promise.all(documentId.map(id => fetch(`/api/documents/${id}`, { method: 'DELETE' })))
    return responses
  }

  const handleDeleteDocuments = () => {
    console.log("delete document 123")
    const selectedDocuments = table.getSelectedRowModel().rows.map(row => row.original.documentId);
    deleteDocumentFetcher(selectedDocuments).then(() => {
      console.log("Delete document success")
      mutate(`/api/documents/all?page=${pageIdx}&limit=${PAGE_SIZE}`)
    })
      .catch((error) => {
        console.log("Delete document error", error)
      })
    setRowSelection({})
  }

  if (error) {
    throw new Error('An error occurred while fetching all documents.')
  }

  return (
    <div className="w-full min-w-[70vw]">
      <div className="flex items-center py-4">
        <Input
          id="filter-owner"
          placeholder="過濾所有者..."
          value={(table.getColumn("所有者")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("所有者")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              顯示欄位 <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="space-x-2 py-2">
        <SuperUserAssignReviewerButton reviewRequestList={getRowSelectedReviewRequestList()} onConfirmChangeReviewers={handleChangeReviewers} />
        <SuperUserDeleteDocumentButton rowSelectedDocumentInfo={getRowSelectedDocumentInfoList()} onConfirmDelete={handleDeleteDocuments} />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  暫無資料
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-center space-x-2 py-4">
        {/* <div className="space-x-2">
          <Button onClick={() => setPageIdx(1)}>第一頁</Button>
          {
            pageIdx-1 > 0 ?
              <Button onClick={() => setPageIdx(pageIdx-1)}>{pageIdx-1}</Button>
              : null
          }
          {
            Array.from({length: Math.min(4, lastPageIdx-pageIdx+1)}, (_, i) => i + pageIdx).map((page) => (
              <Button key={page} 
                      onClick={() => setPageIdx(page)}
                      className={page === pageIdx ? "bg-blue-500 text-white" : ""}
              >
                {page}
              </Button>
            ))
          }
          {
            pageIdx+4 < lastPageIdx ?
              <Button onClick={() => setPageIdx(pageIdx+4)}>{pageIdx+4}</Button>
              : null
          }
          <Button onClick={() => setPageIdx(lastPageIdx)}>最後一頁</Button>
        </div> */}
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious onClick={() => setPageIdx(() => pageIdx > 1 ? pageIdx - 1 : pageIdx)} />
            </PaginationItem>
            {/* <PaginationItem>
              <PaginationLink isActive >{pageIdx}</PaginationLink>
            </PaginationItem> */}
            {
              Array.from({ length: Math.min(5, lastPageIdx) }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    isActive={page === pageIdx}
                    onClick={() => setPageIdx(page)}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))
            }
            {/* <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem> */}
            <PaginationItem>
              <PaginationNext onClick={() => setPageIdx(() => pageIdx + 1 <= lastPageIdx ? pageIdx + 1 : pageIdx)} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>

      </div>
    </div>
  )
}

