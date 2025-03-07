import { NextResponse, NextRequest } from "next/server";
import { verify } from "paseto-ts/v4";

export async function middleware(request: NextRequest) {
  const authToken = request.cookies.get("auth")?.value;

  if (!authToken) return NextResponse.redirect(new URL("/login", request.url));

  try {
    await verify(process.env.NEXT_PUBLIC_PASETO_PUBLIC_KEY || "", authToken);
  } catch {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/home/:path*"],
};
