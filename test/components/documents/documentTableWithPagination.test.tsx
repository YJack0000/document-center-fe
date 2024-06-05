import { expect, it } from 'vitest'
import { render } from '@testing-library/react'
import DocumentTableWithPagination from "@/components/documents/documentTableWithPagination"

it('DocumentTableWithPagination renders correctly', () => {
    const { container } = render(<DocumentTableWithPagination type={"me"} />)
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
        載入中...
      </div>
    `)
})

it('DocumentTableWithPagination renders correctly', () => {
    const { container } = render(<DocumentTableWithPagination type={"public_all"} />)
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
        載入中...
      </div>
    `)
})

