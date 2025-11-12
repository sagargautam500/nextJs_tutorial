//src/app/api/custom-auth/verify-email-code/route.ts
import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
// Zod schema
const schema = z.object({
  email: z.string().email(),
  code: z.string().length(4, "Code must be 4 digits"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validate input
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0].message },
        { status: 400 }
      );
    }

    const { email, code } = parsed.data;

    // ✅ Find matching code
    const record = await prisma.emailVerification.findFirst({
      where: { email, code },
      orderBy: { createdAt: "desc" },
    });

    if (!record) {
      return NextResponse.json({ error: "Invalid code" }, { status: 400 });
    }

    // ✅ Check expiration
    if (record.expiresAt < new Date()) {
      return NextResponse.json({ error: "Code expired" }, { status: 400 });
    }

    // ✅ Delete all codes for this email
    await prisma.emailVerification.deleteMany({
      where: { email },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Verify Email Code Error:", error);
    return NextResponse.json(
      { error: "Failed to verify code" },
      { status: 500 }
    );
  }
}
