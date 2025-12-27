import { auth } from "@/auth";
import { PaymentWrapper } from "@/components/payment/payment-form";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

interface PaymentPageProps {
  params: Promise<{
    bookingId: string;
  }>;
}

export default async function PaymentPage({ params }: PaymentPageProps) {
  const { bookingId } = await params;
  const session = await auth();

  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: { service: true },
  });

  if (!booking || booking.userId !== session?.user?.id) {
    notFound();
  }

  if (booking.status === "CONFIRMED" || booking.status === "COMPLETED") {
    return (
      <div className="container py-20 text-center">
        <h1 className="mb-4 text-3xl font-bold text-green-600">
          Payment Successful
        </h1>
        <p>This booking is already confirmed.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-md px-4 py-10">
      <h1 className="mb-6 text-center text-2xl font-bold">Complete Payment</h1>
      <div className="bg-muted mb-6 rounded p-4 text-sm">
        <p>
          <strong>Service:</strong> {booking.service.title}
        </p>
        <p>
          <strong>Total:</strong> BDT {booking.totalCost}
        </p>
      </div>
      <PaymentWrapper bookingId={bookingId} />
    </div>
  );
}
