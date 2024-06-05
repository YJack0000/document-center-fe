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
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"
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
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
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
import { useRouter } from "next/navigation"
import { Badge } from "../ui/badge"

const PublicBtn = ({
  documentId,
  isPublic,
}: {
  documentId: string
  isPublic: boolean
}) => {
  //
  const router = useRouter()
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={isPublic ? "warning" : "success"} className="ml-2">
          {isPublic ? "取消公開" : "設為公開"}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            確定要設為{isPublic ? "不公開" : "公開"}嗎？
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction
            onClick={async () => {
              await fetch(`/api/documents/public/${documentId}`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ isPublic: !isPublic }),
              })
              router.refresh()
            }}
          >
            確認
          </AlertDialogAction>
          <AlertDialogCancel>取消</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export const columns: ColumnDef<DocumentDTO>[] = [
  {
    accessorKey: "title",
    header: "標題",
    cell: ({ row }) => {
      const router = useRouter()
      return (
        <div
          className="capitalize cursor-pointer hover:underline"
          onClick={() => {
            router.push(`/public/documents/${row.original.id}`)
          }}
        >
          {row.getValue("title")}
        </div>
      )
    },
  },
  {
    accessorKey: "owner",
    header: "擁有者",
    cell: ({ row }) => (
      <div className="capitalize">{(row.getValue("owner") as any)["name"]}</div>
    ),
  },
  {
    accessorKey: "isPublic",
    header: "公開狀態",
    cell: ({ row }) => (
      <div className="capitalize">
        <Badge
          className="justify-center min-w-16 pointer-events-none"
          variant={row.getValue("isPublic") ? "success" : "warning"}
        >
          {row.getValue("isPublic") ? "公開" : "不公開"}
        </Badge>
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
    id: "actions",
    header: "操作",
    enableHiding: false,
    cell: ({ row }) => {
      const document = row.original
      return (
        <div className="flex items-center">
          <PublicBtn documentId={document.id} isPublic={document.isPublic} />
        </div>
      )
    },
  },
]

export function PublicDataTable({ data }: { data: DocumentDTO[] }) {
  const router = useRouter()
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
                  沒有結果
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
