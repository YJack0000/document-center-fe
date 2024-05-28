"use client"

import * as React from "react"
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

type SuperUserAllDocumnetSelectUserType = {
  userId: string
  userName: string
}

export default function SuperUserAllDocumnetSelectUser() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  const [userlist, setUserlist] = React.useState<SuperUserAllDocumnetSelectUserType[]>([
    {
      userId: "001",
      userName: "User1"
    }, 
    {
      userId: "002",
      userName: "User2"
    }, 
    {
      userId: "003",
      userName: "User3"
    }, 
    {
      userId: "004",
      userName: "User4"
    }
  ])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value ? value : "Select user"}
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
