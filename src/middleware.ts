import { RedirectStatusCode } from 'next/dist/client/components/redirect-status-code'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

type PrivilegeDTO = {
    "privilege": string
}

const getPrivilege = async (request: NextRequest): Promise<PrivilegeDTO> => {
    const cookie = request.headers.get('cookie')
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/users/privilege`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'cookie': cookie || '',
        },
    })
    
    return await response.json()
}

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/superuser')) {
    const privilege = await getPrivilege(request)
    if (privilege.privilege !== 'superuser') {
        console.log(privilege)
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/`, { status: RedirectStatusCode.TemporaryRedirect })
    }
  }
}