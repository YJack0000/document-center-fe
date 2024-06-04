import { expect, it } from 'vitest'
import { render } from '@testing-library/react'
import { DataTable } from "@/components/documents/documentTable"

it('AddDocumentBtn renders correctly', () => {
    const { container } = render(<DataTable data={[]} />)
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div
        class="w-full"
      >
        <div
          class="rounded-md border"
        >
          <div
            class="relative w-full overflow-auto"
          >
            <table
              class="w-full caption-bottom text-sm"
            >
              <thead
                class="[&_tr]:border-b"
              >
                <tr
                  class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                >
                  <th
                    class="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0"
                  >
                    標題
                  </th>
                  <th
                    class="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0"
                  >
                    擁有者
                  </th>
                  <th
                    class="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0"
                  >
                    審核狀態
                  </th>
                  <th
                    class="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0"
                  >
                    更新時間
                  </th>
                  <th
                    class="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0"
                  >
                    建立時間
                  </th>
                  <th
                    class="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0"
                  >
                    審核者
                  </th>
                  <th
                    class="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0"
                  >
                    操作
                  </th>
                </tr>
              </thead>
              <tbody
                class="[&_tr:last-child]:border-0"
              >
                <tr
                  class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                >
                  <td
                    class="p-4 align-middle [&:has([role=checkbox])]:pr-0 h-24 text-center"
                    colspan="7"
                  >
                    暫時沒有文件
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `)
})