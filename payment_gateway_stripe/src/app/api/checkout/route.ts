// payment_gateway_stripe/src/app/api/checkout/route.ts
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

interface CheckoutRequestBody {
  priceId: string;
  quantity: number;
}

export async function POST(req: Request) {
  try {
    const body: CheckoutRequestBody = await req.json();

    const { priceId, quantity } = body;

    if (!priceId || !quantity || quantity < 1) {
      return NextResponse.json(
        { error: "Invalid checkout request" },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    // Type-safe error handling
    const errorMessage =
      error instanceof Error ? error.message : "Internal Server Error";

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
