"use client"

import * as React from "react"
import { useEffect } from "react"
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


import { reviewerObjType } from './type'
import useSWR from "swr"
import { fetcher } from "@/services/superuser/allDocumentsTable"
import { FetchTypeWrapper, FetchUsersData } from "@/services/superuser/type"

import { urls } from "@/services/superuser/url"

type SuperuserAllDocumnetSelectUserType = {
  userId: string
  userName: string
}

type SuperuserAllDocumnetSelectUserProps = {
  reviewerObj: reviewerObjType,
  setReviewerObj: any
}

type FetchUsersType = FetchTypeWrapper<FetchUsersData>

export default function SuperuserAllDocumnetSelectUser({
  reviewerObj, setReviewerObj
} : SuperuserAllDocumnetSelectUserProps
){
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState(reviewerObj.reviewer)

  const [shouldFetch, setShouldFetch] = React.useState(false);

  const enableFetch = () => {
    setShouldFetch(true);
  }

  const [userlist, setUserlist] = React.useState<SuperuserAllDocumnetSelectUserType[]>([])

  const { data, error } = useSWR<FetchUsersType>( 
    shouldFetch ? urls.GET_USERS_URL
                : null, fetcher)
  // console.log(shouldFetch)

  if(error) {
    throw new Error('An error occurred while fetching the userlist.')
  }
  
  useEffect(() => {
    if(data) {
      const users = data.data.map((userObj: any) => {
        return {
          userId: userObj.id,
          userName: userObj.name
        }
      })
      setUserlist(users)
    }
  }, [data]); // Only re-run the effect if data changes

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
          {value ? value : "請選擇"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search user..." />
          <CommandEmpty>No user found.</CommandEmpty>
          <CommandGroup>
            <CommandList>
            {userlist.map((user) => (
              <CommandItem
                key={user.userId}
                value={user.userName}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue)
                  setReviewerObj(reviewerObj.documentId, currentValue)
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === user.userName ? "opacity-100" : "opacity-0"
                  )}
                />
                {user.userName}
              </CommandItem>
            ))}
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
