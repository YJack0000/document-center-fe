import { CalendarDays } from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

export default function DocumentDate({createdAt, editedAt, reviewAt} : 
    {createdAt: string, editedAt: string, reviewAt: string}) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild className="p-0">
        <Button variant="link" className="text-black underline">{reviewAt}</Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-60">
        <div className="flex justify-between space-x-4">
          <div className="space-y-1">
            {/* <h4 className="text-sm font-semibold">@nextjs</h4> */}
            <div className="flex">
              <CalendarDays className="mr-2 h-4 w-4 opacity-70" />
              <span className="text-sm text-muted-foreground">
                建立於 {createdAt}
              </span>
            </div>
            <div className="flex">
              <CalendarDays className="mr-2 h-4 w-4 opacity-70" />
              <span className="text-sm text-muted-foreground">
                編輯於 {editedAt}
              </span>
            </div>
            <div className="flex">
              <CalendarDays className="mr-2 h-4 w-4 opacity-70" />
              <span className="text-sm text-muted-foreground">
                送審於 {reviewAt}
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
