// src/app/api/checkout/route.ts
import { prisma } from '@/lib/prisma'
import { stripe } from '@/lib/stripe'
import { NextResponse } from 'next/server'
import { z } from 'zod'

// ✅ Validation schema
const checkoutSchema = z.object({
  items: z.array(
    z.object({
      name: z.string().min(1),
      price: z.number().positive(),
      quantity: z.number().int().positive(),
      image: z.string().optional(),
    })
  ).min(1),
  user: z.object({
    id: z.string().min(1),
    email: z.string().email(),
  }),
  paymentMethod: z.enum(['card', 'esewa', 'khalti', 'connectips']).optional().default('card'),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const validationResult = checkoutSchema.safeParse(body)

    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid request data', details: validationResult.error.issues },
        { status: 400 }
      )
    }

    const { items, user, paymentMethod } = validationResult.data

    // ✅ Calculate total amount
    const amount = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

    if (amount < 1) {
      return NextResponse.json(
        { error: 'Order amount must be at least 1 NPR' },
        { status: 400 }
      )
    }

    // ✅ Step 1: Create order first (without items)
    const order = await prisma.order.create({
      data: {
        userId: user.id,
        email: user.email,
        amount,
        currency: 'npr',
        status: 'pending',
        paymentMethod,
      },
    })

    // ✅ Step 2: Create order items separately (MongoDB does not support nested writes)
    await prisma.orderItem.createMany({
      data: items.map(item => ({
        orderId: order.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image || null,
      })),
    })

    // ✅ Handle different payment methods

    // Stripe Checkout for card payments
    if (paymentMethod === 'card') {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: items.map(item => ({
          price_data: {
            currency: 'npr',
            product_data: { 
              name: item.name,
              images: item.image ? [item.image] : undefined,
            },
            unit_amount: Math.round(item.price * 100), // Convert to paisa
          },
          quantity: item.quantity,
        })),
        success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel?orderId=${order.id}`,
        customer_email: user.email,
        metadata: {
          orderId: order.id,
          userId: user.id,
        },
      })

      // Update order with Stripe session ID
      await prisma.order.update({
        where: { id: order.id },
        data: { stripeCheckoutSession: session.id },
      })

      return NextResponse.json({
        url: session.url,
        orderId: order.id,
        paymentMethod: 'card',
      })
    }

    // Esewa, Khalti, ConnectIPS — redirect to their payment pages
    if (['esewa', 'khalti', 'connectips'].includes(paymentMethod)) {
      const paymentUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/payment/${paymentMethod}?orderId=${order.id}`

      return NextResponse.json({
        url: paymentUrl,
        orderId: order.id,
        paymentMethod,
      })
    }

    // This should not be reached as all payment methods are handled above
    return NextResponse.json(
      { error: 'Invalid payment method' },
      { status: 400 }
    )
  } catch (err) {
    console.error('Checkout Error:', err)

    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 500 })
    }

    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}
