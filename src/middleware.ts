import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    const publicPaths = ["/auth/login", "/auth/register", "/favicon.ico"]

    if (publicPaths.includes(pathname)) {
        return NextResponse.next()
    }

    const token = request.cookies.get("token")?.value
    if (!token) {
        const loginUrl = new URL("/auth", request.url)
        return NextResponse.redirect(loginUrl)
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/perfil/:path*",
    ],
}