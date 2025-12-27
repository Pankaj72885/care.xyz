"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import {
  BookingCreateInput,
  bookingCreateSchema,
} from "@/lib/validations/booking";
import { revalidatePath } from "next/cache";

// Type with totalCost derived
type BookingCreateServerInput = BookingCreateInput & { totalCost: number };

export async function createBooking(data: BookingCreateServerInput) {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "Unauthorized" };
  }

  const result = bookingCreateSchema.safeParse(data);
  if (!result.success) {
    return { error: "Invalid booking data" };
  }

  const {
    serviceId,
    durationUnit,
    durationValue,
    division,
    district,
    city,
    area,
    address,
  } = result.data;
  const { totalCost } = data; // Trust client? NO. Recalculate server side.

  try {
    const service = await prisma.service.findUnique({
      where: { id: serviceId },
    });
    if (!service) return { error: "Service not found" };

    const calculatedCost = service.baseRate * durationValue;
    // Validate cost
    if (calculatedCost !== totalCost) {
      // console.warn("Cost mismatch", calculatedCost, totalCost);
      // You might want to fail or just overwrite. Overwriting is safer.
    }

    const booking = await prisma.booking.create({
      data: {
        userId: session.user.id,
        serviceId,
        durationUnit,
        durationValue,
        division,
        district,
        city,
        area,
        address,
        totalCost: calculatedCost,
        status: "PENDING",
      },
    });

    revalidatePath("/dashboard");
    return { success: true, bookingId: booking.id };
  } catch (error) {
    console.error("Booking create error:", error);
    return { error: "Failed to create booking" };
  }
}
