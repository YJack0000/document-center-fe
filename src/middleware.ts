import { RedirectStatusCode } from 'next/dist/client/components/redirect-status-code'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

type PrivilegeDTO = {
    "privilege": string
}

const getPrivilege = async (request: NextRequest): Promise<PrivilegeDTO> => {
    const cookie = request.headers.get('cookie')
    const response = await fetch(`https://document-center.cerana.tech/api/users/privilege`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'cookie': cookie || '',
        },
    })

    return await response.json()
}

export async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    if (
        pathname.startsWith("/_next") || // exclude Next.js internals
        pathname.startsWith("/api") || //  exclude all API routes
        pathname.startsWith("/static") || // exclude static files
        pathname.startsWith("/favicon.ico") // exclude favicon
    ) {
        return NextResponse.next();
    }

    if (pathname.startsWith("/login")) {
        const cookie = request.headers.get("access_token");
        if (cookie) {
            // if the user is already logged in, redirect to the home page
            return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/`, {
                status: RedirectStatusCode.TemporaryRedirect,
            });
        }
        return NextResponse.next();
    }

    if (request.nextUrl.pathname.startsWith("/superuser")) {
        const privilege = await getPrivilege(request);
        if (privilege.privilege !== "superuser") {
            return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/login`, {
                status: RedirectStatusCode.TemporaryRedirect,
            });
        }
    }

    // check if the user is logged in
    if (pathname.startsWith("/documents") || pathname.startsWith("/reviews")) {
        const cookie = request.cookies.get("access_token");
        if (!cookie) {
            return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/login`, {
                status: RedirectStatusCode.TemporaryRedirect,
            });
        }
    }
}
