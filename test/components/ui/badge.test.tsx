import { expect, it } from 'vitest'
import { render } from '@testing-library/react'
import { Badge } from "@/components/ui/badge"

it('Badge renders correctly', () => {
    const { container } = render(<Badge variant="outline">Badge</Badge>)
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div
        class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground"
      >
        Badge
      </div>
    `)
})