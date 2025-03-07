import prisma from "@/libs/prisma";
import bcrypt from "bcryptjs";
import { sign } from "paseto-ts/v4";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { username, password } = body;

  if (!username || !password)
    return NextResponse.json(
      { error: "Username and password not provided" },
      { status: 400 }
    );

  const user = await prisma.users.findUnique({
    where: {
      username,
    },
  });

  if (!user)
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

  const validatedPassword = await bcrypt.compare(
    password,
    user?.password || ""
  );

  if (validatedPassword) {
    const token = await sign(process.env.PASETO_SECRET_KEY || "", user);
    const cookieStore = await cookies();
    cookieStore.set({
      name: "auth",
      value: token,
      httpOnly: false,
      path: "/",
    });
    return NextResponse.json({ message: "Successful login" }, { status: 200 });
  } else
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
}
