import Stripe from 'stripe';
import { NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-07-30.basil',
});

export async function POST(req: Request) {
  const { priceId } = await req.json();

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{ price: priceId, quantity: 1 }],
    mode: 'subscription', // or 'payment' for one-time
    success_url: `${process.env.NEXT_BASE_URL}/success`,
    cancel_url: `${process.env.NEXT_BASE_URL}/cancel`,
  });

  return NextResponse.json({ result: session, ok: true });
}
