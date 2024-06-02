"use client"

import { useState, useEffect } from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { CommandList } from "cmdk"
import useSWR from "swr"

type SuperuserAllDocumnetSelectUserProps = {
  newReviewer: UserInfo | null
  onReviewerChange: (newReviewer: UserInfo | null ) => void
}

type FetchedUserList = PagedWrapper<UserDTO>

const fetcher = (url: string) => fetch(url).then(r => r.json())

export default function SuperuserAllDocumnetSelectUser({
  newReviewer, onReviewerChange
} : SuperuserAllDocumnetSelectUserProps
){
  const [open, setOpen] = useState(false)
  const [shouldFetch, setShouldFetch] = useState(false);

  const enableFetch = () => {
    setShouldFetch(true);
  }

  const [assignableUserList, setAssignableUserList] = useState<UserInfo[]>([])
  const { data: fetchReviewerResponse, error } = useSWR<FetchedUserList>(shouldFetch ? '/api/users' : null, fetcher)
  
  useEffect(() => {
    if(fetchReviewerResponse) {
      setAssignableUserList(fetchReviewerResponse.data)
    }
  }, [fetchReviewerResponse]); // Only re-run the effect if data changes

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-30 justify-between"
          onClick={enableFetch}
        >
          {newReviewer ? newReviewer.name : "請選擇"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search user..." />
          <CommandEmpty>No user found.</CommandEmpty>
          <CommandGroup>
            <CommandList>
            {assignableUserList.map((user) => (
              <CommandItem
                key={user.id}
                value={user.name}
                onSelect={(name: string) => {
                  onReviewerChange(user.name === newReviewer?.name ? null : user)
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    newReviewer?.name === user.name ? "opacity-100" : "opacity-0"
                  )}
                />
                {user.name}
              </CommandItem>
            ))}
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
