import { expect, it } from 'vitest'
import { render } from '@testing-library/react'
import AssignReviewerButton from "@/components/superuser/AssignReviewerButton"

it('AssignReviewerButton renders correctly', () => {
    const { container } = render(<AssignReviewerButton 
            reviewRequestList={[]} 
            onConfirmChangeReviewers={() => {} } />)
    expect(container.firstChild).toMatchInlineSnapshot(`
      <button
        aria-controls="radix-:r0:"
        aria-expanded="false"
        aria-haspopup="dialog"
        class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-blue-400 h-10 px-4 py-2"
        data-state="closed"
        type="button"
      >
        審核
      </button>
    `)
})