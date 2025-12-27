"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import {
  BookingCreateInput,
  bookingCreateSchema,
} from "@/lib/validations/booking";
import { BookingStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

// Create a new booking
export async function createBooking(
  data: BookingCreateInput & { totalCost: number }
) {
  const session = await auth();
  if (!session?.user) {
    return { error: "Not authenticated" };
  }

  const result = bookingCreateSchema.safeParse({
    ...data,
    // totalCost is not part of schema validation as it's calculated but passed securely or recalculated
    // Schema doesn't have totalCost, so we handle it separately or trust the client (better to recalculate)
  });

  if (!result.success) {
    return { error: "Invalid booking data" };
  }

  // Recalculate cost for security
  const service = await prisma.service.findUnique({
    where: { id: data.serviceId },
  });

  if (!service) {
    return { error: "Service not found" };
  }

  const calculatedCost = data.durationValue * service.baseRate;

  try {
    const booking = await prisma.booking.create({
      data: {
        userId: session.user.id!,
        serviceId: data.serviceId,
        durationUnit: data.durationUnit,
        durationValue: data.durationValue,
        division: data.division,
        district: data.district,
        city: data.city,
        area: data.area,
        address: data.address,
        totalCost: calculatedCost,
        status: "PENDING",
      },
    });

    revalidatePath("/dashboard");
    return { success: true, bookingId: booking.id };
  } catch (error) {
    console.error("Booking creation error:", error);
    return { error: "Failed to create booking" };
  }
}

// Get user bookings
export async function getUserBookings() {
  const session = await auth();
  if (!session?.user) return [];

  return await prisma.booking.findMany({
    where: { userId: session.user.id },
    include: {
      service: true,
      payment: true,
    },
    orderBy: { createdAt: "desc" },
  });
}

// Admin: Update booking status
export async function updateBookingStatus(
  bookingId: string,
  newStatus: BookingStatus
) {
  const session = await auth();

  if (!session || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized: Only admins can update booking status");
  }

  try {
    const booking = await prisma.booking.update({
      where: { id: bookingId },
      data: { status: newStatus },
    });

    revalidatePath("/admin/bookings");
    revalidatePath("/admin");
    revalidatePath("/dashboard");
    return { success: true, booking };
  } catch (error) {
    console.error("Failed to update booking status:", error);
    throw new Error("Failed to update booking status");
  }
}

// User: Complete booking
export async function completeBooking(bookingId: string) {
  const session = await auth();

  if (!session || !session.user) {
    throw new Error("Unauthorized");
  }

  try {
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
    });

    if (!booking) {
      throw new Error("Booking not found");
    }

    if (booking.userId !== session.user.id) {
      throw new Error("Unauthorized: You can only complete your own bookings");
    }

    if (booking.status !== "CONFIRMED") {
      throw new Error("Only confirmed bookings can be marked as completed");
    }

    const updatedBooking = await prisma.booking.update({
      where: { id: bookingId },
      data: { status: "COMPLETED" },
    });

    revalidatePath("/dashboard");
    revalidatePath("/admin/bookings");
    return { success: true, booking: updatedBooking };
  } catch (error) {
    console.error("Failed to complete booking:", error);
    throw error instanceof Error
      ? error
      : new Error("Failed to complete booking");
  }
}
