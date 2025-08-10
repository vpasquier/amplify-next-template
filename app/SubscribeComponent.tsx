'use client';

import React from 'react';
import { loadStripe } from '@stripe/stripe-js';

interface SubscribeComponentProps {
  priceId: string;
  description?: string;
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const SubscribeComponent: React.FC<SubscribeComponentProps> = ({ priceId, description }) => {
  const handleClick = async () => {
    const stripe = await stripePromise;
    if (!stripe) {
      console.error('Stripe failed to load');
      return;
    }

    const response = await fetch('/api/stripe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ priceId }),
    });

    const data = await response.json();
    if (!data.ok) {
      console.error('Checkout session creation failed', data);
      return;
    }

    await stripe.redirectToCheckout({ sessionId: data.result.id });
  };

  return (
    <button onClick={handleClick}>
      {description ? `Subscribe (${description})` : 'Subscribe Now'}
    </button>
  );
};

export default SubscribeComponent;
