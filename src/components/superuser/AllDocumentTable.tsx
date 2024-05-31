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
// import { createDeflate } from "zlib"
import { format, min, set } from 'date-fns';
import SuperUserDeleteDocument from "./DeleteDocument"
import SuperUserAssignReviewerBtn from "./AssignReviewerBtn"
import RowSortingBtn from "./RowSortingBtn"
import { Source_Serif_4 } from "next/font/google"

import { reviewerObjType, rowSelectedDocumentInfoType } from './type'
import { FetchTypeWrapper, FetchAllDocumentsData } from "@/services/superuser/type"
import useSWR from "swr"
import { DefaultFetcher } from "@/services/superuser/Fetcher"

import { urls } from "@/services/superuser/url"
import { use } from "chai"

type fetchAllDocumentsType = FetchTypeWrapper<FetchAllDocumentsData>

type superuserAllDocumnetTableProps = {
  documentId: string,
  title: string,
  status: string,
  owner: string,
  createdAt: string,
  editAt: string,
  reviewAt: string,
  reviewer: string
}

function convertToSuperuserTableProps(data: FetchAllDocumentsData): superuserAllDocumnetTableProps {
  return {
    documentId: data.id,
    title: data.title,
    status: data.status,
    owner: data.owner.name,
    createdAt: data.createAt,
    editAt: data.updateAt,
    reviewAt: data.updateAt,
    reviewer: ""
  }
}

const switchPagehandler = (page: number, setPageIdx: (p: number) => void) => {
  // console.log("switch page to: ", page)
  setPageIdx(page)
}


export default function SuperUserAllDocumnetTable() {

  const [pageIdx, setPageIdx] = useState(1)
  const [lastPageIdx, setLastPageIdx] = useState(1)

  const { data: allDocumentsFetched, isLoading, error } 
      = useSWR<fetchAllDocumentsType>(`${urls.GET_DOCUMENT_ALL_URL}?page=${pageIdx}&limit=${urls.pageSize}`, 
                                        DefaultFetcher)

  const [ allDocuments, setAllDocuments ] = useState<superuserAllDocumnetTableProps[]>(
    allDocumentsFetched 
    ? allDocumentsFetched.data.map((docFetched) => convertToSuperuserTableProps(docFetched))
    : []
  )

  const [data, setData] = useState<superuserAllDocumnetTableProps[]>(allDocuments)
  const [reviewerObjs, setReviewerObjs] = useState<reviewerObjType[]>([])

  useEffect(() => {
    setAllDocuments(
      allDocumentsFetched 
      ? allDocumentsFetched.data.map((docFetched) => convertToSuperuserTableProps(docFetched))
      : []
    )
    setLastPageIdx(
      allDocumentsFetched 
      ? allDocumentsFetched.total
      : 1
    )
  }, [allDocumentsFetched])

  useEffect(() => {
    // console.log("set data")
    setData(allDocuments)
    setReviewerObjs(allDocuments.map(doc => {
      return {
        documentId: doc.documentId,
        reviewer: doc.reviewer
      }
    }
    ))
  }, [allDocuments])


  const setReviewerObj = (documentId: string, reviewer: string) => {
    
    setReviewerObjs(reviewerObjs.map(obj => {
      if (obj.documentId === documentId) {
        return {
          documentId: documentId,
          reviewer: reviewer
        }
      }
      return obj
    }))
  }

  const columns: ColumnDef<superuserAllDocumnetTableProps>[] = [
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
          <div className="text-center">{row.original.owner}</div>
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
        const {createdAt, editAt} = row.original
        const [createDate, editDate] = [createdAt, editAt].map(date => format(new Date(date), 'MM/dd/yyyy'))
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
        return (
          <div>{format(new Date(row.original.reviewAt), 'MM/dd/yyyy')}</div>
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
        const currentObj = reviewerObjs.find(obj => obj.documentId === row.original.documentId) as reviewerObjType

        return (
          <SuperUserAllDocumnetSelectUser 
            reviewerObj={currentObj}
            setReviewerObj={setReviewerObj}
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

  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  const deleteDocumentHandler = () => {
    console.log("delete document")
    table.getSelectedRowModel().rows.forEach((row) => {
      console.log("Remove document: ", row.original.documentId)
      setData((data) => 
        data.filter((d) => d.documentId !== row.original.documentId)
      )
    })
    setRowSelection({})
  }

  const getRowSelectedDocumentInfo = () => {
    return table.getSelectedRowModel().rows.map((row) => {
      return {
        "documentId": row.original.documentId,
        "title": row.original.title,
        "status": row.original.status,
        "owner": row.original.owner,
        "assignUser" : row.original.reviewer
      }
    })
  }


  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    initialState: {
      pagination: {
        pageSize: urls.pageSize
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
        {/* <Button>送審</Button> */}
        <SuperUserAssignReviewerBtn rowSelectedDocumentInfo={getRowSelectedDocumentInfo()} reviewerObjs={reviewerObjs} />
        {/* <Button onClick={deleteDocumentHandler}>刪除</Button> */}
        <SuperUserDeleteDocument rowSelectedDocumentInfo={getRowSelectedDocumentInfo()} deleteDocumentHandler={deleteDocumentHandler} />
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
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-center space-x-2 py-4">
        {/* <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div> */}
        <div className="space-x-2">
          {/* <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Prev
          </Button>
          <span>
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageOptions().length}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button> */}
          <Button onClick={()=>switchPagehandler(1, setPageIdx)}>第一頁</Button>
          {
            pageIdx-1 > 0 ?
              <Button onClick={()=>switchPagehandler(pageIdx-1, setPageIdx)}>{pageIdx-1}</Button>
              : null
          }
          {
            Array.from({length: Math.min(4, lastPageIdx-pageIdx+1)}, (_, i) => i + pageIdx).map((page) => (
              <Button key={page} 
                      onClick={()=>switchPagehandler(page, setPageIdx)}
                      className={page === pageIdx ? "bg-blue-500 text-white" : ""}
              >
                {page}
              </Button>
            ))
          }
          {
            pageIdx+4 < lastPageIdx ?
              <Button onClick={()=>switchPagehandler(pageIdx+4, setPageIdx)}>{pageIdx+4}</Button>
              : null
          }
          <Button onClick={()=>switchPagehandler(lastPageIdx, setPageIdx)}>最後一頁</Button>
        </div>
      </div>
    </div>
  )
}

