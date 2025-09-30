import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";


export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      sig!,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      // ✅ Create order in DB
      await prisma.order.create({
        data: {
          stripeSession: session.id,
          customerEmail: session.customer_details?.email ?? null,
          totalAmount: session.amount_total ?? 0,
          currency: session.currency ?? "usd",
          status: "paid",
          items: {
            create: (session.line_items?.data ?? []).map((item) => ({
              productId: item.price?.id ?? "unknown",
              quantity: item.quantity ?? 1,
            })),
          },
        },
      });
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }
}

export const config = {
  api: {
    bodyParser: false, // ❌ Important: webhook requires raw body
  },
};
