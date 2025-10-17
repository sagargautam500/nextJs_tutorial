// src/app/api/orders/[id]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params; // ✅ must await
  if (!id) {
    return NextResponse.json(
      { error: "Order ID is required" },
      { status: 400 }
    );
  }
  try {
    // Fetch order by ID with items
    const order = await prisma.order.findUnique({
      where: { id },
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
        esewaRefId: true,
        khaltiToken: true,
        connectipsTransId: true,
        items: {
          select: {
            id: true,
            name: true,
            price: true,
            quantity: true,
            image: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({
      order: {
        ...order,
        createdAt: order.createdAt.toISOString(),
      },
    });
  } catch (err) {
    console.error("Failed to fetch order:", err);
    return NextResponse.json(
      { error: "Failed to fetch order details" },
      { status: 500 }
    );
  }
}
