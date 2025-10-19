import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const files = await prisma.file.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(files);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch files" }, { status: 500 });
  }
}
