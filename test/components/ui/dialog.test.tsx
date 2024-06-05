import { expect, it } from 'vitest'
import { render } from '@testing-library/react'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

it('Dialog renders correctly', () => {
    const { container } = render(
        <Dialog>
            <DialogTrigger>Open</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>

    )
    expect(container.firstChild).toMatchInlineSnapshot(`
      <button
        aria-controls="radix-:r0:"
        aria-expanded="false"
        aria-haspopup="dialog"
        data-state="closed"
        type="button"
      >
        Open
      </button>
    `)
})