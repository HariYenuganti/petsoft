import { auth } from '@/lib/auth';
import { NextResponse } from 'next/server';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: 'User not logged in' }, { status: 401 });
  }

  try {
    const checkoutSession = await stripe.checkout.sessions.create({
      customer_email: session.user.email,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment?canceled=true`,
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],
      metadata: {
        userId: session.user.id,
      },
      payment_method_types: ['card'],
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.error('Error in create-checkout-session:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 },
    );
  }
}
