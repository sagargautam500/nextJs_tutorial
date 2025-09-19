// app/api/auth/forgot/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import crypto from "crypto";
import { sendEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email is required" },
        { status: 400 }
      );
    }

    const user = await db.user.findUnique({ where: { email } });

    if (user) {
      // Generate token + expiry
      const resetToken = crypto.randomBytes(32).toString("hex");
      const resetExpires = new Date(Date.now() + 1000 * 60 * 15); // 15 min

      await db.user.update({
        where: { email },
        data: { resetToken, resetExpires },
      });

      // Reset link (later: send via email)
      const resetUrl = `${process.env.NEXTAUTH_URL}/auth/reset/${resetToken}`;
      // console.log("Password reset link:", resetUrl);

       // Call sendEmail helper
    await sendEmail({
      to: email,
      subject: "Password Reset Request",
      html: `
        <p>Hi ${user.name || "User"},</p>
        <p>You requested to reset your password. Click the link below to reset it:</p>
        <a href="${resetUrl}" style="color:blue;">Reset Password</a>
        <p>This link will expire in 15 minutes.</p>
        <p>If you didn't request this, ignore this email.</p>
      `,
    });
    }

    // Always return success to prevent user enumeration
    return NextResponse.json({
      success: true,
      message: "If an account with that email exists, a reset link has been sent.",
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}
