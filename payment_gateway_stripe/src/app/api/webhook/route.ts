import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  try {
    if (!sig) {
      console.error("Missing Stripe signature");
      return new NextResponse("Missing Stripe signature", { status: 400 });
    }

    if (!process.env.STRIPE_WEBHOOK_SECRET) {
      console.error("Missing STRIPE_WEBHOOK_SECRET environment variable");
      return new NextResponse("Webhook secret not configured", { status: 500 });
    }

    const event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    console.log(`Received webhook event: ${event.type}`);

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        
        // Retrieve line items from the session
        const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
        
        // Check if order already exists to prevent duplicates
        const existingOrder = await prisma.order.findUnique({
          where: { stripeSession: session.id },
        });

        if (existingOrder) {
          console.log(`Order ${session.id} already exists, skipping creation`);
          break;
        }

        // Create order in database
        await prisma.order.create({
          data: {
            stripeSession: session.id,
            customerEmail: session.customer_details?.email ?? null,
            totalAmount: session.amount_total ?? 0,
            currency: session.currency ?? "usd",
            status: "paid",
            items: {
              create: lineItems.data.map((item) => ({
                productId: item.price?.id ?? "unknown",
                quantity: item.quantity ?? 1,
              })),
            },
          },
        });

        console.log(`Order created for session: ${session.id}`);
        break;
      }

      case "checkout.session.expired": {
        const session = event.data.object as Stripe.Checkout.Session;
        console.log(`Checkout session expired: ${session.id}`);
        
        // Optionally create a record for expired sessions
        await prisma.order.upsert({
          where: { stripeSession: session.id },
          update: { status: "expired" },
          create: {
            stripeSession: session.id,
            customerEmail: session.customer_details?.email ?? null,
            totalAmount: session.amount_total ?? 0,
            currency: session.currency ?? "usd",
            status: "expired",
            items: {
              create: [],
            },
          },
        });
        break;
      }

      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log(`Payment succeeded: ${paymentIntent.id}`);
        // Handle successful payment if needed
        break;
      }

      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log(`Payment failed: ${paymentIntent.id}`);
        // Handle failed payment if needed
        break;
      }

      case "invoice.payment_succeeded": {
        const invoice = event.data.object as Stripe.Invoice;
        console.log(`Invoice payment succeeded: ${invoice.id}`);
        // Handle subscription payments if applicable
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    
    const errorMessage = error instanceof Error ? error.message : "Webhook error occurred";
    
    // Log detailed error information for debugging
    if (error instanceof Error && error.message.includes("signature")) {
      console.error("Signature verification failed. Check webhook secret.");
    }
    
    return new NextResponse(`Webhook Error: ${errorMessage}`, {
      status: 400,
    });
  }
}

// Note: In App Router, body parsing is handled automatically
// No need for config export in App Router
// Note: In production, verify the webhook signature using STRIPE_WEBHOOK_SECRET
// and handle other relevant events as needed