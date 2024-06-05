import { expect, it } from 'vitest'
import { render } from '@testing-library/react'
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"

it('HoverCard renders correctly', () => {
    const { container } = render(
        <HoverCard>
            <HoverCardTrigger>Hover</HoverCardTrigger>
            <HoverCardContent>
                The React Framework – created and maintained by @vercel.
            </HoverCardContent>
        </HoverCard>
    )
    expect(container.firstChild).toMatchInlineSnapshot(`
      <a
        data-state="closed"
      >
        Hover
      </a>
    `)
})