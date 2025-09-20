import { NextResponse } from "next/server";
import { z } from "zod";
import nodemailer from "nodemailer";
import { prisma } from "@/lib/prisma";

// Zod schema
const schema = z.object({
  email: z.string().email("Invalid email"),
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

    const { email } = parsed.data;

    // Generate 4-digit code
    const code = Math.floor(1000 + Math.random() * 9000).toString();

    // Set expiration 10 min
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    // ✅ Type-safe Prisma call
    await prisma.emailVerification.create({
      data: { email, code, expiresAt },
    });

    // Nodemailer setup
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS, // Gmail App Password
      },
    });

    // Send email
    await transporter.sendMail({
      from: `"next-auth-verify" <${process.env.SMTP_USER}>`,
      to: email, // recipient
      subject: "Email Verification Code",
      text: `Your verification code is: ${code}`,
      html: `<p>Your verification code is: <strong>${code}</strong></p>`,
    });

    return NextResponse.json({ message: "Verification code sent to email" });
  } catch (error: any) {
    console.error("Send Email Code Error:", error);
    return NextResponse.json(
      { error: "Failed to send verification email" },
      { status: 500 }
    );
  }
}
