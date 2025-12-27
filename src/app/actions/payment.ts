"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";

export async function createPaymentIntent(bookingId: string) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  if (!stripe) {
    throw new Error("Payment system not configured");
  }

  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
  });

  if (!booking || booking.userId !== session.user.id) {
    throw new Error("Booking not found");
  }

  if (booking.status === "CONFIRMED" || booking.status === "COMPLETED") {
    // Already paid? Return existing or minimal info
    // For now throwing error, but ideally check payment status
    throw new Error("Booking already confirmed");
  }

  // Create PaymentIntent
  // Amount in Poisha/Cents. booking.totalCost is presumably in BDT.
  // Multiply by 100 for cents/poisha
  const amount = booking.totalCost * 100;

  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: "bdt", // Change to usd if Stripe account is US test mode, but BDT supported? Stripe supports BDT if merchant is in BD or certain config. Let's assume USD for test if BDT fails, but usually we map.
    // NOTE: Stripe BDT support might require specific account setup. If this fails, use 'usd' for demo.
    // For safety in this demo environment, let's stick to 'usd' or ensure we handle it.
    // Actually, let's try 'usd' for guaranteed test mode success unless specific requirement.
    // User requested Bangladesh context, so BDT is preferred. Let's try BDT.
    automatic_payment_methods: {
      enabled: true,
    },
    metadata: {
      bookingId: booking.id,
      userId: session.user.id,
    },
  });

  return { clientSecret: paymentIntent.client_secret };
}
