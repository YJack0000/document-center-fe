"use client"

import * as React from "react"
import { useEffect, useState } from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { 
  ArrowUpDown,
  ChevronDown,
  Rewind,
  User, 
  // MoreHorizontal 
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  // DropdownMenuItem,
  // DropdownMenuLabel,
  // DropdownMenuSeparator,
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

import SuperUserAllDocumnetSelectUser from "./SelectAssignReviewer"
import SuperUserAllDocumnetShowReviewDialog from "./ReviewHistory"
import { format, min, set } from 'date-fns';
import SuperUserDeleteDocumentButton from "./DeleteDocumentButton"
import SuperUserAssignReviewerButton from "./AssignReviewerButton"
import RowSortingBtn from "./RowSortingBtn"
import { Source_Serif_4 } from "next/font/google"

import useSWR from "swr"
import { use } from "chai"

const PAGE_SIZE = 10

type FetchedAllDocumentList = PagedWrapper<DocumentDTO>

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

  const [pageIdx, setPageIdx] = useState(1)
  const [lastPageIdx, setLastPageIdx] = useState(1)
  
  const { data, isLoading, error } 
      = useSWR<FetchedAllDocumentList>(`/api/documents/all?page=${pageIdx}&limit=${PAGE_SIZE}`, 
                                        fetcher)
  const [tableData, setTableData] = useState<SuperuserAllDocumnetTableRow[]>([])

  useEffect(() => {
    if(data) {
      console.log("Data fetched: ", data)
      setTableData(data.data.map((document: DocumentDTO) => convertToSuperuserTableRow(document)))
      setLastPageIdx(data.totalPage)
    }
  }, [data])

  useEffect(() => {
    // [TODO] fetch reviewer info
    
    // [TODO] set reviewer info to tableData

  }, [tableData])


  const handleChangeReviewer = (documentId: string, reviewer: UserInfo) => {
    console.log("Reviewer changed: ", reviewer)
    // change reviewer info in tableData
    setTableData((tableData) => {
      return tableData.map((data) => {
        if(data.documentId === documentId) {
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
      header: ({column}) => {
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
            ? (<span className="px-2 py-1 text-xs font-semibold text-white bg-green-500 rounded-full"> {status} </span>)
            : status === "reject"
            ? (<span className="px-2 py-1 text-xs font-semibold text-white bg-red-500 rounded-full"> {status} </span>)
            : status === "review"
            ? (<span className="px-2 py-1 text-xs font-semibold text-white bg-yellow-500 rounded-full"> {status} </span>)
            : (<span className="px-2 py-1 text-xs font-semibold text-white bg-blue-500 rounded-full"> {status} </span>)}
          </>
        )
      }
    },
    {
      id: "所有者",
      accessorKey: "owner",
      header: ({column}) => {
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
      cell: ({row}) => {
        const {createdAt, editedAt} = row.original
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
        if(row.original.reviewedAt === null) {
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
      id: "指定送審者",
      accessorKey: "reviewer",
      header: ({ column }) => (
        <div className="w-20">指定送審者</div>
      ),
      cell: ({ row }) => {


        return (
          <SuperUserAllDocumnetSelectUser 
            reviewer={row.original.reviewer}
            onReviewerChange={(reviewer: UserInfo) => handleChangeReviewer(row.original.documentId, reviewer)}
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
    useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  const handleDeleteDocuments = () => {
    console.log("delete document")
    table.getSelectedRowModel().rows.forEach((row) => {
      console.log("Remove document: ", row.original.documentId)
      // [TODO] delete document
    })
    // [TODO] refetch data
    setRowSelection({})
  }

  const handleChangeReviewers = (requestsInfo: {documentId: string, reviewerId: string}[]) => {
    // [TODO] change reviewer
    requestsInfo.forEach((request) => {
      console.log("Change reviewer: ", request)
    })
    // for end
    // [TODO] refetch data
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
        "assignedReviewer" : row.original.newReviewer
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

  
  if(isLoading) {
    return <div>Loading...</div>
  }

  if(error) {
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
        <div className="space-x-2">
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
        </div>
      </div>
    </div>
  )
}

