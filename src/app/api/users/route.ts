import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const users = await prisma.users.findMany({
    select: {
      id: true,
      username: true,
      role: true,
      active: true,
    },
  });
  return NextResponse.json({ users }, { status: 200 });
}
