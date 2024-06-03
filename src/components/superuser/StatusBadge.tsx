import { Badge } from "@/components/ui/badge"

export function StatusBadge({ status }: { status: "pass" | "reject" | "review" | "wait" | "transfer" | "edit" | string }) {
    return (<>
        {status === "pass"
          ? (<Badge className="justify-center min-w-16 text-sx font-semibold text-green-600 bg-green-200 pointer-events-none"> 通過 </Badge>)
          : status === "reject"
            ? (<Badge className="justify-center min-w-16 text-sx font-semibold text-red-600 bg-red-200 pointer-events-none"> 拒絕 </Badge>)
            : status === "review"
              ? (<Badge className="justify-center min-w-16 text-sx font-semibold text-yellow-600 bg-yellow-200 pointer-events-none"> 審核中 </Badge>)
              : status === "wait"
                ? (<Badge className="justify-center min-w-16 text-sx font-semibold text-yellow-600 bg-yellow-200 pointer-events-none"> 等待中 </Badge>)
                : status === "transfer"
                  ? (<Badge className="justify-center min-w-16 text-sx font-semibold text-blue-600 bg-blue-200 pointer-events-none"> 轉交 </Badge>)
                  : status === "edit"
                    ? (<Badge className="justify-center min-w-16 text-sx font-semibold text-gray-600 bg-gray-200 pointer-events-none"> 編輯中 </Badge>)
                    : (<Badge className="justify-center min-w-16 text-sx font-semibold text-purple-600 bg-purple-200 pointer-events-none"> {status} </Badge>)}
      </>)
}
