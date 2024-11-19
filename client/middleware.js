// import { NextResponse } from "next/server";

import { NextRequest, NextResponse } from "next/server";

export function middleware() {
  return NextResponse.next();
}

// export async function middleware(req) {
//   console.log("Checking authentication status...");
//   const res = await fetch("http://localhost:4000/api/auth/status", {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
//   console.log("Response status:", res.status);
//   console.log("Response ok:", res.ok);
//   if (res.ok) {
//     return NextResponse.next();
//   } else {
//     console.log("Redirecting to sign-in...");
//     return NextResponse.redirect(new URL("/auth/sign-in", req.url));
//   }
// }

// export const config = {
//   matcher: ["/dashboard"],
// };
