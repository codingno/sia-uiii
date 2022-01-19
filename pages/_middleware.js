import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"

/** @param {import("next/server").NextRequest} req */
export async function middleware(req) {
  // if (req.nextUrl.pathname === "/middleware-protected") {
    const session = await getToken({
      req,
      secret: process.env.SECRET,
      // secureCookie:
      //   process.env.NEXTAUTH_URL?.startsWith("https://") ??
      //   !!process.env.VERCEL_URL,
    })
    // You could also check for any property on the session object,
    // like role === "admin" or name === "John Doe", etc.
    // if (!session) return NextResponse.redirect("/api/auth/signin")

		// if(status == 'authenticated') 
  console.log(`🚀 ~ file: _middleware.js ~ line 20 ~ middleware ~ req.nextUrl.pathname !== /api/g`, req.nextUrl.pathname)
  console.log(`🚀 ~ file: _middleware.js ~ line 20 ~ middleware ~ req.nextUrl.pathname !== /api/g`, /api/.test(req.nextUrl.pathname))
	const staticFile = /favicon/.test(req.nextUrl.pathname) ||  /static/.test(req.nextUrl.pathname) ||  /auth/.test(req.nextUrl.pathname) || /api/.test(req.nextUrl.pathname)
	if(staticFile)
		return
  console.log(`🚀 ~ file: _middleware.js ~ line 22 ~ middleware ~ staticFile`, staticFile)
  console.log(`🚀 ~ file: _middleware.js ~ line 24 ~ middleware ~ req.nextUrl.pathname !== '/'`, req.nextUrl.pathname !== '/')
  if (session && req.nextUrl.pathname !== "/student/verification" && !/api/.test(req.nextUrl.pathname)) {
  console.log(`🚀 ~ file: _middleware.js ~ line 23 ~ middleware ~ req.nextUrl.pathname !== "/student/verification" && !/api/.test(req.nextUrl.pathname) && staticFile`, req.nextUrl.pathname !== "/student/verification" && !/api/.test(req.nextUrl.pathname) && staticFile)
		if(session.user.isStudent) 
			if(!session.user.studentData.status)
				return NextResponse.redirect('/student/verification')	
    // If user is authenticated, continue.
  }
  // }

}
