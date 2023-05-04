import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req, res) {
    // token will exist if user is logged in
    const token = await getToken({ req, secret: process.env.JWT_SECRET });
    
    const url = req.nextUrl.clone();
    const { pathname } = req.nextUrl;

    // allow the request if the following is true...
    // 1. the token exists
    // 2. it's a request for next-auth session & provider fetching
    
    console.log("url: ", url.href);
    
    if (pathname.includes("/_next")) {
        return NextResponse.next();
    }

    if (pathname.includes("/api/auth") || token) {
        console.log("login");
        return NextResponse.next();
    };

    // redirect to login if no token AND requesting protected route
    /*if (!token && pathname !== "/login") {
        console.log("redirect: ", pathname);
        return NextResponse.redirect(`${url.host}/login`);
    };*/

    console.log("fail: ", pathname);
    return NextResponse.next();
};

// https://stackoverflow.com/questions/76166740/nextjs-middleware-typeerror-networkerror-when-attempting-to-fetch-resource