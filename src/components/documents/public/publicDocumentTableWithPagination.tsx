import useSWR from "swr"
import { PublicDataTable } from "./publicDocumentTable"
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {Input} from "@/components/ui/input"
import { useState } from "react"
import useDebounce from "@/lib/debounce"

const PublicDocumentTableWithPagination = () => {
  const [pageIndex, setPageIndex] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const route = "/api/documents/public/all"

    const [search, setSearch] = useState("")
    const debouncedSearch = useDebounce<string>(search, 500);
  const { data, error, isLoading } = useSWR(
    `${route}?page=${pageIndex}&limit=${pageSize}&search=${debouncedSearch}`,
    async (url: string) => {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error("取資料失敗")
      }
      return response.json()
    }
  )

  if (error) return <div>取資料失敗</div>
  return (
    <div className="flex items-center justify-between flex-col gap-2">
        <Input type="text" placeholder="搜尋" value={search} onChange={(e) => setSearch(e.target.value)} />
            {!isLoading ? 
            <PublicDataTable data={data.data} /> : <div> 載入中... </div>}
      {data && data.data.length > 0 && (
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center space-x-6 lg:space-x-8">
            <div className="flex items-center space-x-2">
              <p className="text-sm font-medium">每頁顯示：</p>
              <Select
                value={`${pageSize}`}
                onValueChange={(value) => setPageSize(Number(value))}
              >
                <SelectTrigger className="h-8 w-[70px]">
                  <SelectValue placeholder={pageSize.toString()} />
                </SelectTrigger>
                <SelectContent side="top">
                  {[10, 20, 30, 40, 50].map(size => (
                    <SelectItem key={size} value={`${size}`}>{size}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-sm font-medium">筆</p>
            </div>
            <div className="flex w-[100px] items-center justify-center text-sm font-medium">
              第 {pageIndex} 頁，共 {data.totalPages} 頁
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex"
                onClick={() => setPageIndex(1)}
                disabled={pageIndex === 1}
              >
                <DoubleArrowLeftIcon className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="h-8 w-8 p-0"
                onClick={() => setPageIndex(Math.max(1, pageIndex - 1))}
                disabled={pageIndex === 1}
              >
                <ChevronLeftIcon className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="h-8 w-8 p-0"
                onClick={() => setPageIndex(Math.min(data.totalPages, pageIndex + 1))}
                disabled={pageIndex === data.totalPages}
              >
                <ChevronRightIcon className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex"
                onClick={() => setPageIndex(data.totalPages)}
                disabled={pageIndex === data.totalPages}
              >
                <DoubleArrowRightIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div> 
  )
}

export default PublicDocumentTableWithPagination
