import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  const session = event.data.object as Stripe.PaymentIntent;

  if (event.type === "payment_intent.succeeded") {
    const bookingId = session.metadata.bookingId;

    if (bookingId) {
      await prisma.booking.update({
        where: { id: bookingId },
        data: {
          status: "CONFIRMED",
          payment: {
            create: {
              amount: session.amount / 100, // Convert back to unit (or keep as cents if schema expects minor units? Schema says Int, "minor unit (e.g. BDT in smallest unit)".
              // Wait, in schema I wrote "minor unit".
              // In payment intent I sent amount in cents/poisha.
              // So I should save it as is?
              // Schema: "amount Int // minor unit"
              // OK, so I save session.amount.
              amount: session.amount,
              currency: session.currency,
              stripePaymentIntentId: session.id,
              status: session.status,
            },
          },
        },
      });
    }
  }

  return new NextResponse(null, { status: 200 });
}
