"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
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
  MoreHorizontal,
  Pencil,
  Trash,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useRouter } from "next/navigation"
import { StatusBadge } from "../superuser/StatusBadge"

export const columns: ColumnDef<DocumentDTO>[] = [
  {
    accessorKey: "title",
    header: "標題",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("title")}</div>
    ),
  },
  {
    accessorKey: "owner",
    header: "擁有者",
    cell: ({ row }) => (
      <div className="capitalize">{(row.getValue("owner") as any)["name"]}</div>
    ),
  },
  {
    accessorKey: "status",
    header: "狀態",
    cell: ({ row }) => (
      <div className="capitalize">
        <StatusBadge status={row.getValue("status")} />
      </div>
    ),
  },
  {
    accessorKey: "updateAt",
    header: "更新時間",
    cell: ({ row }) => (
      <div className="capitalize">
        {new Date(row.getValue("updateAt")).toLocaleString()}
      </div>
    ),
  },
  {
    accessorKey: "createAt",
    header: "建立時間",
    cell: ({ row }) => (
      <div className="capitalize">
        {new Date(row.getValue("createAt")).toLocaleString()}
      </div>
    ),
  },
  {
    id: "actions",
    header: "操作",
    enableHiding: false,
    cell: ({ row }) => {
      const document = row.original
      const router = useRouter()
      return (
        <>
          <Button
            className="hover:bg-blue-400"
            onClick={() => router.push(`/documents/${document.id}/edit`)}
            disabled={document.status !== "edit"}
          >
            <Pencil className="mr-2 h-4 w-4" /> 編輯
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                className="ml-2"
                variant="destructive"
                disabled={document.status !== "edit"}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>確定要刪除嗎？</AlertDialogTitle>
                <AlertDialogDescription>
                  這個動作執行之後將無法透過 UI 復原，請問要繼續動作嗎？
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogAction
                  className="bg-destructive"
                  onClick={async () => {
                    await fetch(`/api/documents/${document.id}`, {
                      method: "DELETE",
                    })
                    window.location.reload()
                  }}
                >
                  確認
                </AlertDialogAction>
                <AlertDialogCancel>取消</AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      )
    },
  },
]

export function DataTable({ data }: { data: DocumentDTO[] }) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

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
  })

  return (
    <div className="w-full">
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
                  暫時沒有文件
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
