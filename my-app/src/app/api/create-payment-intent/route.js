import Stripe from 'stripe';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { connectToDatabase } from '@/lib/mongoose';
import Order from '@/models/Order';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    // ตรวจสอบ session
    const session = await getServerSession(authOptions);
    if (!session) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const { amount, items, shippingAddress } = await request.json();

    await connectToDatabase();

    // สร้าง Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // แปลงเป็นสตางค์
      currency: 'thb',
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        userId: session.user.id
      }
    });

    // สร้างออเดอร์ใหม่
    const order = new Order({
      userId: session.user.id,
      items,
      totalAmount: amount,
      paymentIntentId: paymentIntent.id,
      shippingAddress
    });

    await order.save();

    return new Response(JSON.stringify({ 
      clientSecret: paymentIntent.client_secret,
      orderId: order._id
    }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Error creating payment intent:', err);
    return new Response(JSON.stringify({ error: 'Error creating payment intent' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
