import { headers } from 'next/headers';
import Stripe from 'stripe';
import { connectToDatabase } from '@/lib/mongoose';
import Order from '@/models/Order';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(request) {
  try {
    const body = await request.text();
    const signature = headers().get('stripe-signature');

    let event;
    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        webhookSecret
      );
    } catch (err) {
      console.error('⚠️ Webhook signature verification failed:', err.message);
      return new Response(`Webhook Error: ${err.message}`, { status: 400 });
    }

    await connectToDatabase();

    // จัดการ event ต่างๆ จาก Stripe
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        // ค้นหาและอัพเดทสถานะออเดอร์
        const order = await Order.findOne({ paymentIntentId: paymentIntent.id });
        if (order) {
          order.status = 'completed'; // อัพเดทสถานะเป็น completed
          await order.save();
          console.log(`💰 Payment for order ${order._id} completed`);
        }
        break;

      case 'payment_intent.payment_failed':
        const failedPaymentIntent = event.data.object;
        const failedOrder = await Order.findOne({ paymentIntentId: failedPaymentIntent.id });
        if (failedOrder) {
          failedOrder.status = 'failed'; // อัพเดทสถานะเป็น failed
          await failedOrder.save();
          console.log(`❌ Payment for order ${failedOrder._id} failed`);
        }
        break;

      case 'payment_intent.processing':
        const processingPaymentIntent = event.data.object;
        const processingOrder = await Order.findOne({ paymentIntentId: processingPaymentIntent.id });
        if (processingOrder) {
          processingOrder.status = 'processing'; // อัพเดทสถานะเป็น processing
          await processingOrder.save();
          console.log(`⏳ Payment for order ${processingOrder._id} is processing`);
        }
        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return new Response(JSON.stringify({ received: true }));
  } catch (err) {
    console.error('Webhook error:', err);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }
}
