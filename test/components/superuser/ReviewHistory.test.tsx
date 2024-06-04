import { expect, it } from 'vitest'
import { render } from '@testing-library/react'
import ReviewHistory from "@/components/superuser/ReviewHistory"

it('ReviewHistory renders correctly', () => {
    const { container } = render(<ReviewHistory documentId='123'/>)
    expect(container.firstChild).toMatchInlineSnapshot(`
      <button
        aria-controls="radix-:r0:"
        aria-expanded="false"
        aria-haspopup="dialog"
        class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
        data-state="closed"
        type="button"
      >
        審核紀錄
      </button>
    `)
})