import onHandleAuthorization from "@/libs/authorization";
import prisma from "@/libs/prisma";
import bcrypt from "bcryptjs";
import { userScheme } from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");

  const authorization = await onHandleAuthorization(authHeader);
  if (authorization instanceof NextResponse) return authorization;

  const users = await prisma.users.findMany({
    select: {
      id: true,
      username: true,
      role: true,
      active: true,
    },
  });
  return NextResponse.json(users , { status: 200 });
}

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get("authorization");

  const authorization = await onHandleAuthorization(authHeader);
  if (authorization instanceof NextResponse) return authorization;

  try {
    const body = await request.json();
    const { username, password, role, active } = body;

    const validatedUser = userScheme.safeParse(body);

    if (!validatedUser.success)
      return NextResponse.json({ error: validatedUser }, { status: 400 });

    await prisma.users.create({
      data: {
        username,
        role,
        active,
        password: bcrypt.hashSync(password, 10),
      },
    });

    return NextResponse.json({ message: "User created" }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Body not provided" }, { status: 400 });
  }
}
