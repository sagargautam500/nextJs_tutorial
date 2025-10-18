// src/app/api/orders/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const email = searchParams.get("email");

    // Validate at least one parameter is provided
    if (!userId && !email) {
      return NextResponse.json(
        { error: "userId or email is required" },
        { status: 400 }
      );
    }

    // Build where clause
    const where: { userId?: string; email?: string } = {};
    if (userId) where.userId = userId;
    if (email) where.email = email;

    // Fetch orders
    const orders = await prisma.order.findMany({
      where,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        amount: true,
        currency: true,
        email: true,
        status: true,
        paymentMethod: true,
        createdAt: true,
        stripeCheckoutSession: true,
        stripePaymentIntentId: true,
      },
    });

    return NextResponse.json({
      orders: orders.map((order) => ({
        ...order,
        createdAt: order.createdAt.toISOString(),
      })),
    });
  } catch (err) {
    console.error("Failed to fetch orders:", err);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}