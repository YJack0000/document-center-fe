"use client"

import * as React from "react"
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

import SuperUserAllDocumnetSelectUser from "./selectAssignReviewer"
import SuperUserAllDocumnetShowReviewDialog from "./reviewHistory"
// import { createDeflate } from "zlib"
import { format } from 'date-fns';
import SuperUserDeleteDocument from "./deleteDocument"
import RowSortingBtn from "./rowSortingBtn"


type SuperUserAllDocumnetTableProps = {
  documentId: string,
  title: string,
  status: string,
  owner: string,
  createdAt: string,
  editAt: string,
  reviewAt: string
}

export const columns: ColumnDef<SuperUserAllDocumnetTableProps>[] = [
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
    header: ({ column }) => (
      <div className="w-20">指定送審者</div>
    ),
    cell: ({ row }) => {
      return (
        <SuperUserAllDocumnetSelectUser />
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

// async function fetchData(page: number, pageSize: number) {
//   const response = await fetch(`/api/data?page=${page}&pageSize=${pageSize}`);
//   const data = await response.json();
//   return data;
// }

// async function fetchDataTotalCount() {
//   const response = await fetch(`/api/data/total-count`);
//   const data = await response.json();
//   return data;
// }

// const switchPagehandler = (page: number, setPageIdx: (p: number) => void) => {
//   console.log("switch page to: ", page)
//   setPageIdx(page)
// }

export default function SuperUserAllDocumnetTable() {
  const [pageIdx, setPageIdx] = React.useState(1)
  const [data, setData] = React.useState<SuperUserAllDocumnetTableProps[]>([
    {
      documentId: "001",
      title: "INV001",
      status: "pass",
      owner: "User1",
      createdAt: "2024-05-24T09:17:51.867Z",
      editAt: "2024-05-24T09:17:51.867Z",
      reviewAt: "2024-05-24T09:17:51.867Z"
    },
    {
      documentId: "002",
      title: "INV002",
      status: "reject",
      owner: "yuchang",
      createdAt: "2024-05-24T09:17:51.867Z",
      editAt: "2024-05-24T09:17:51.867Z",
      reviewAt: "2024-05-24T09:17:51.867Z"
    },
    {
      documentId: "003",
      title: "INV003",
      status: "review",
      owner: "yjack",
      createdAt: "2024-05-24T09:17:51.867Z",
      editAt: "2024-05-24T09:17:51.867Z",
      reviewAt: "2024-05-24T09:17:51.867Z"
    },
    {
      documentId: "004",
      title: "INV004",
      status: "edit",
      owner: "dora",
      createdAt: "2024-05-24T09:17:51.867Z",
      editAt: "2024-05-24T09:17:51.867Z",
      reviewAt: "2024-05-24T09:17:51.867Z"
    },
    {
      documentId: "005",
      title: "INV005",
      status: "pass",
      owner: "yuchang",
      createdAt: "2024-05-24T09:17:51.867Z",
      editAt: "2024-05-24T09:17:51.867Z",
      reviewAt: "2024-05-24T09:17:51.867Z"
    },
    {
      documentId: "006",
      title: "INV006",
      status: "reject",
      owner: "yjack",
      createdAt: "2024-05-24T09:17:51.867Z",
      editAt: "2024-05-24T09:17:51.867Z",
      reviewAt: "2024-05-24T09:17:51.867Z"
    },
    {
      documentId: "007",
      title: "INV007",
      status: "review",
      owner: "dora",
      createdAt: "2024-05-24T09:17:51.867Z",
      editAt: "2024-05-24T09:17:51.867Z",
      reviewAt: "2024-05-24T09:17:51.867Z"
    },
  ])

  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

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
        "owner": row.original.owner
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
        pageSize: 5
      }
    }
  })

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
        <Button>送審</Button>
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
          <Button
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
          </Button>
          {/* <Button onClick={()=>switchPagehandler(1, setPageIdx)}>第一頁</Button>
          {
            pageIdx-1 > 0 ?
              <Button onClick={()=>switchPagehandler(pageIdx-1, setPageIdx)}>{pageIdx-1}</Button>
              : null
          }
          {
            Array.from({length: 4}, (_, i) => i + pageIdx).map((page) => (
              <Button key={page} 
                      onClick={()=>switchPagehandler(page, setPageIdx)}
                      className={page === pageIdx ? "bg-blue-500 text-white" : ""}
              >
                {page}
              </Button>
            ))
          }
          <Button onClick={()=>switchPagehandler(10, setPageIdx)}>最後一頁</Button> */}
        </div>
      </div>
    </div>
  )
}

