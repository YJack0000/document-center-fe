import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"
import { useCallback } from "react"

type rowSortingBtnProps = {
    column: any,
    header: string
}

export default function RowSortingBtn({
column, header
} : rowSortingBtnProps ){

// console.log(header)
const RowSortingHandler = () => {
    column.toggleSorting(column.getIsSorted() === "asc")
}

return (
  <Button
    variant="ghost"
    onClick={RowSortingHandler}
  >
    {header}
    <ArrowUpDown className="ml-2 h-4 w-4" />
  </Button>
)}