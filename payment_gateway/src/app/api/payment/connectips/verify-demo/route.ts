// src/app/api/payment/connectips/verify-demo/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const demoVerifySchema = z.object({
  orderId: z.string().min(1),
  status: z.enum(["success", "failed"]),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validationResult = demoVerifySchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Invalid request data" },
        { status: 400 }
      );
    }

    const { orderId, status } = validationResult.data;

    // Update order status
    const orderStatus = status === "success" ? "paid" : "failed";
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: {
        status: orderStatus,
        connectipsTransId: status === "success" ? `DEMO-${Date.now()}` : undefined,
      },
    });

    console.log(`✅ ConnectIPS Demo: Order ${orderId} marked as ${orderStatus}`);

    return NextResponse.json({
      success: true,
      message: `Demo payment ${status}`,
      order: updatedOrder,
    });
  } catch (err) {
    console.error("ConnectIPS demo verify error:", err);
    return NextResponse.json(
      { error: "Failed to process demo payment" },
      { status: 500 }
    );
  }
}