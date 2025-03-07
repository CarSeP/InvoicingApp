import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const cookieStore = await cookies()
    await cookieStore.delete("auth")

    return NextResponse.redirect(new URL("/login", request.url));
}
