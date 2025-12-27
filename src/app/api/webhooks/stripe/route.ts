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
      const booking = await prisma.booking.update({
        where: { id: bookingId },
        data: {
          status: "CONFIRMED",
          payment: {
            create: {
              amount: session.amount,
              currency: session.currency,
              stripePaymentIntentId: session.id,
              status: session.status,
              receiptUrl: (session as any).charges?.data?.[0]?.receipt_url,
            },
          },
        },
        include: {
          user: true,
          service: true,
        },
      });

      // Send Invoice Email
      await import("@/lib/email").then(({ sendBookingInvoice }) =>
        sendBookingInvoice({
          userEmail: booking.user.email,
          userName: booking.user.name,
          bookingId: booking.id,
          serviceTitle: booking.service.title,
          totalCost: booking.totalCost,
          durationValue: booking.durationValue,
          durationUnit: booking.durationUnit,
          receiptUrl: (session as any).charges?.data?.[0]?.receipt_url,
          bookingDate: booking.createdAt,
        })
      );
    }
  }

  return new NextResponse(null, { status: 200 });
}
