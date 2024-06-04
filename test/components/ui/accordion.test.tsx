import { expect, it } from 'vitest'
import { render } from '@testing-library/react'

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"




it('Accordion renders correctly', () => {
    const { container } = render(
        <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
                <AccordionTrigger>Is it accessible?</AccordionTrigger>
                <AccordionContent>
                    Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div
        data-orientation="vertical"
      >
        <div
          class="border-b"
          data-orientation="vertical"
          data-state="closed"
        >
          <h3
            class="flex"
            data-orientation="vertical"
            data-state="closed"
          >
            <button
              aria-controls="radix-:r1:"
              aria-expanded="false"
              class="flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180"
              data-orientation="vertical"
              data-radix-collection-item=""
              data-state="closed"
              id="radix-:r0:"
              type="button"
            >
              Is it accessible?
              <svg
                class="lucide lucide-chevron-down h-4 w-4 shrink-0 transition-transform duration-200"
                fill="none"
                height="24"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="m6 9 6 6 6-6"
                />
              </svg>
            </button>
          </h3>
          <div
            aria-labelledby="radix-:r0:"
            class="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
            data-orientation="vertical"
            data-state="closed"
            hidden=""
            id="radix-:r1:"
            role="region"
            style="--radix-accordion-content-height: var(--radix-collapsible-content-height); --radix-accordion-content-width: var(--radix-collapsible-content-width);"
          />
        </div>
      </div>
    `)
})
