import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  phone: z.string(),
  code: z.string().length(4, "Code must be 4 digits"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0].message },
        { status: 400 }
      );
    }

    let { phone, code } = parsed.data;
    
    // Add +977 prefix if not already present
    if (!phone.startsWith("+977")) {
    phone = `+977${phone.replace(/^0+/, "")}`; // remove leading 0 if exists
    }

    // Find latest code
    const record = await prisma.phoneVerification.findFirst({
      where: { phone, code },
      orderBy: { createdAt: "desc" },
    });

    if (!record) {
      return NextResponse.json({ error: "Invalid code" }, { status: 400 });
    }

    if (record.expiresAt < new Date()) {
      return NextResponse.json({ error: "Code expired" }, { status: 400 });
    }

    // Delete used codes
    await prisma.phoneVerification.deleteMany({ where: { phone } });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Verify Phone Code Error:", error);
    return NextResponse.json(
      { error: "Failed to verify code" },
      { status: 500 }
    );
  }
}
