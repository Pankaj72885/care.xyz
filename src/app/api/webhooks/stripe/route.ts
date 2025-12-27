import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request) {
  if (!stripe) {
    return new NextResponse("Stripe not configured", { status: 500 });
  }

  const body = await req.text();
  const signature = (await headers()).get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    return new NextResponse(`Webhook Error: ${(error as Error).message}`, {
      status: 400,
    });
  }

  const session = event.data.object as Stripe.PaymentIntent;

  if (event.type === "payment_intent.succeeded") {
    const bookingId = session.metadata?.bookingId;

    if (bookingId) {
      // Cast to allow accessing charges which might be missing from the base type if not expanded
      const sessionWithCharges = session as Stripe.PaymentIntent & {
        charges: Stripe.ApiList<Stripe.Charge>;
      };
      const receiptUrl =
        sessionWithCharges.charges?.data?.[0]?.receipt_url ?? null;

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
              receiptUrl: receiptUrl,
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
          receiptUrl: receiptUrl,
          bookingDate: booking.createdAt,
        })
      );
    }
  }

  return new NextResponse(null, { status: 200 });
}
