import { expect, it } from 'vitest'
import { render } from '@testing-library/react'
import SuperUserAllDocumnetTable from "@/components/superuser/AllDocumentTable";

it('SuperUserAllDocumnetTable renders correctly', () => {
    const { container } = render(<SuperUserAllDocumnetTable />)
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div
        class="w-full min-w-[1000px]"
      >
        <div
          class="flex items-center py-4"
        >
          <input
            class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 max-w-sm"
            id="filter-owner"
            placeholder="過濾所有者..."
            value=""
          />
          <button
            aria-expanded="false"
            aria-haspopup="menu"
            class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 ml-auto"
            data-state="closed"
            id="radix-:r0:"
            type="button"
          >
            顯示欄位 
            <svg
              class="lucide lucide-chevron-down ml-2 h-4 w-4"
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
        </div>
        <div
          class="space-x-2 py-2"
        >
          <button
            aria-controls="radix-:r2:"
            aria-expanded="false"
            aria-haspopup="dialog"
            class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-blue-400 h-10 px-4 py-2"
            data-state="closed"
            type="button"
          >
            審核
          </button>
          <button
            aria-controls="radix-:r5:"
            aria-expanded="false"
            aria-haspopup="dialog"
            class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-destructive text-destructive-foreground hover:bg-destructive/90 h-10 px-4 py-2"
            data-state="closed"
            type="button"
          >
            刪除
          </button>
        </div>
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
                    <button
                      aria-checked="false"
                      aria-label="Select all"
                      class="peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                      data-state="unchecked"
                      role="checkbox"
                      type="button"
                      value="on"
                    />
                  </th>
                  <th
                    class="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0"
                  >
                    標題
                  </th>
                  <th
                    class="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0"
                  >
                    狀態
                  </th>
                  <th
                    class="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0"
                  >
                    <button
                      class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                    >
                      所有者
                      <svg
                        class="lucide lucide-arrow-up-down ml-2 h-4 w-4"
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
                          d="m21 16-4 4-4-4"
                        />
                        <path
                          d="M17 20V4"
                        />
                        <path
                          d="m3 8 4-4 4 4"
                        />
                        <path
                          d="M7 4v16"
                        />
                      </svg>
                    </button>
                  </th>
                  <th
                    class="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0"
                  >
                    近期審核日期
                  </th>
                  <th
                    class="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0"
                  >
                    原審核者
                  </th>
                  <th
                    class="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0"
                  >
                    <div
                      class="w-40"
                    >
                      指定新審核者
                    </div>
                  </th>
                  <th
                    class="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0"
                  />
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
                    colspan="9"
                  >
                    暫無資料
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div
          class="flex items-center justify-center space-x-2 py-4"
        >
          <nav
            aria-label="pagination"
            class="mx-auto flex w-full justify-center"
            role="navigation"
          >
            <ul
              class="flex flex-row items-center gap-1"
            >
              <li
                class=""
              >
                <a
                  aria-label="Go to previous page"
                  class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 gap-1 pl-2.5"
                >
                  <svg
                    class="lucide lucide-chevron-left h-4 w-4"
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
                      d="m15 18-6-6 6-6"
                    />
                  </svg>
                  <span>
                    Previous
                  </span>
                </a>
              </li>
              <li
                class=""
              >
                <a
                  aria-current="page"
                  class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10"
                >
                  1
                </a>
              </li>
              <li
                class=""
              >
                <a
                  aria-label="Go to next page"
                  class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 gap-1 pr-2.5"
                >
                  <span>
                    Next
                  </span>
                  <svg
                    class="lucide lucide-chevron-right h-4 w-4"
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
                      d="m9 18 6-6-6-6"
                    />
                  </svg>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    `)
})