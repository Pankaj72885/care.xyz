import { auth } from "@/auth";
import { BookingForm } from "@/components/booking/booking-form";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

interface BookingPageProps {
  params: Promise<{
    serviceId: string;
  }>;
}

export default async function BookingPage({ params }: BookingPageProps) {
  const session = await auth();
  if (!session?.user) {
    redirect("/login?callbackUrl=/booking/" + (await params).serviceId);
  }

  const { serviceId } = await params;
  const service = await prisma.service.findUnique({
    where: { id: serviceId },
  });

  if (!service) {
    redirect("/services");
  }

  return (
    <div className="container mx-auto max-w-5xl px-4 py-10">
      <h1 className="mb-8 text-3xl font-bold">Complete Your Booking</h1>
      <BookingForm service={service} userId={session.user.id!} />
    </div>
  );
}
