import { DataTablePagination } from "@/components/documents/dataTablePagination";
import { DataTableDemo } from "@/components/documents/documentTable";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <DataTableDemo />
    </div>
  );
}
