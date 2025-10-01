import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";

interface CheckoutRequestBody {
  priceId: string;
  quantity: number;
  customerEmail?: string;
}

interface CheckoutResponse {
  url?: string;
  error?: string;
  sessionId?: string;
}

export async function POST(req: Request): Promise<NextResponse<CheckoutResponse>> {
  try {
    // Validate request method
    if (req.method !== "POST") {
      return NextResponse.json(
        { error: "Method not allowed" },
        { status: 405 }
      );
    }

    const body: CheckoutRequestBody = await req.json();
    const { priceId, quantity, customerEmail } = body;

    // Enhanced validation
    if (!priceId || typeof priceId !== "string") {
      return NextResponse.json(
        { error: "Valid price ID is required" },
        { status: 400 }
      );
    }

    if (!quantity || quantity < 1 || quantity > 100) {
      return NextResponse.json(
        { error: "Quantity must be between 1 and 100" },
        { status: 400 }
      );
    }

    // Validate email format if provided
    if (customerEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Get the origin for dynamic URL construction
    const headersList = await headers();
    const origin = headersList.get("origin") || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    // Create Stripe checkout session with enhanced configuration
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity,
        },
      ],
      mode: "payment",
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cancel`,
      customer_email: customerEmail,
      billing_address_collection: "auto",
      shipping_address_collection: {
        allowed_countries: ["US", "CA", "GB", "AU", "DE", "FR", "IT", "ES","NE"],
      },
      metadata: {
        quantity: quantity.toString(),
        priceId,
      },
      // Enable automatic tax calculation
      automatic_tax: {
        enabled: true,
      },
      // Set expiration time
      expires_at: Math.floor(Date.now() / 1000) + (30 * 60), // 30 minutes
    });

    if (!session.url) {
      return NextResponse.json(
        { error: "Failed to create checkout session" },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      url: session.url,
      sessionId: session.id 
    });

  } catch (error) {
    console.error("Checkout error:", error);
    
    // Handle specific Stripe errors
    if (error instanceof Error) {
      if (error.message.includes("No such price")) {
        return NextResponse.json(
          { error: "Invalid product or price" },
          { status: 400 }
        );
      }
      
      if (error.message.includes("rate limit")) {
        return NextResponse.json(
          { error: "Too many requests. Please try again later." },
          { status: 429 }
        );
      }
    }

    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
