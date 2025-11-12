import { NextResponse } from "next/server";
import { z } from "zod";
import Twilio from "twilio";
import prisma from "@/lib/prisma";

// Zod schema
const schema = z.object({
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
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

    let { phone } = parsed.data;

    // Add +977 prefix if not already present
    if (!phone.startsWith("+977")) {
      phone = `+977${phone.replace(/^0+/, "")}`; // remove leading 0 if exists
    }

    // Generate 4-digit code
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 min

    // Save code in DB
    await prisma.phoneVerification.create({
      data: { phone, code, expiresAt },
    });

    // Send SMS using Twilio
    const client = Twilio(process.env.TWILIO_SID!, process.env.TWILIO_AUTH_TOKEN!);
    await client.messages.create({
      body: `Your verification code is: ${code}`,
      from: process.env.TWILIO_PHONE_NUMBER!,
      to: phone,
    });

    return NextResponse.json({ message: "Verification code sent to phone" });
  } catch (error: any) {
    console.error("Send Phone Code Error:", error);
    return NextResponse.json(
      { error: "Failed to send verification code" },
      { status: 500 }
    );
  }
}
