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
  FilePen,
  Loader2,
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
import useSWR from "swr"

const ReviewTime = ({ documentId }: any) => {
  const { data, error } = useSWR(`/api/reviews/${documentId}`, async (url) => {
    const response = await fetch(url)
    const data = await response.json()
    return data.data
  })
  if (error) return <div>Failed to load</div>
  if (!data) return <Loader2 className="mr-2 h-4 w-4 animate-spin" />

  if (data.length === 0) {
    return <div>無</div>
  }
  return <div>{new Date(data[0].createdAt).toLocaleString()}</div>
}

export const columns: ColumnDef<DocumentDTO>[] = [
  {
    accessorKey: "title",
    header: "標題",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("title")}</div>
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
    accessorKey: "updatedAt",
    header: "更新時間",
    cell: ({ row }) => <ReviewTime documentId={row.original.id} />,
  },
  {
    id: "actions",
    header: "操作",
    enableHiding: false,
    cell: ({ row }) => {
      const document = row.original as any
      const router = useRouter()
      return (
        <>
          <Button onClick={() => router.push(`/reviews/${document.id}/sign`)}>
            <FilePen /> 簽核
          </Button>
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
