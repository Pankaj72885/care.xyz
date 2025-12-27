"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

// ============================================
// SERVICE MANAGEMENT
// ============================================

export async function toggleServiceStatus(serviceId: string) {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  const service = await prisma.service.findUnique({
    where: { id: serviceId },
  });

  if (!service) {
    throw new Error("Service not found");
  }

  await prisma.service.update({
    where: { id: serviceId },
    data: { active: !service.active },
  });

  revalidatePath("/admin/services");
  return { success: true };
}

export async function createService(data: {
  title: string;
  slug: string;
  description: string;
  category: string;
  baseRate: number;
}) {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  // Check if slug already exists
  const existing = await prisma.service.findUnique({
    where: { slug: data.slug },
  });

  if (existing) {
    throw new Error("Service with this slug already exists");
  }

  const service = await prisma.service.create({
    data: {
      title: data.title,
      slug: data.slug,
      description: data.description,
      category: data.category,
      baseRate: data.baseRate,
      active: true,
    },
  });

  revalidatePath("/admin/services");
  revalidatePath("/services");
  return { success: true, service };
}

export async function updateService(
  serviceId: string,
  data: {
    title: string;
    slug: string;
    description: string;
    category: string;
    baseRate: number;
  }
) {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  // Check if service exists
  const service = await prisma.service.findUnique({
    where: { id: serviceId },
  });

  if (!service) {
    throw new Error("Service not found");
  }

  // Check if slug is taken by another service
  if (data.slug !== service.slug) {
    const existing = await prisma.service.findUnique({
      where: { slug: data.slug },
    });

    if (existing) {
      throw new Error("Service with this slug already exists");
    }
  }

  const updated = await prisma.service.update({
    where: { id: serviceId },
    data: {
      title: data.title,
      slug: data.slug,
      description: data.description,
      category: data.category,
      baseRate: data.baseRate,
    },
  });

  revalidatePath("/admin/services");
  revalidatePath("/services");
  revalidatePath(`/services/${service.slug}`);
  revalidatePath(`/services/${data.slug}`);
  return { success: true, service: updated };
}

export async function deleteService(serviceId: string) {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  // Check if service has bookings
  const service = await prisma.service.findUnique({
    where: { id: serviceId },
    include: { _count: { select: { bookings: true } } },
  });

  if (!service) {
    throw new Error("Service not found");
  }

  if (service._count.bookings > 0) {
    throw new Error(
      "Cannot delete service with existing bookings. Deactivate it instead."
    );
  }

  await prisma.service.delete({
    where: { id: serviceId },
  });

  revalidatePath("/admin/services");
  revalidatePath("/services");
  return { success: true };
}

// ============================================
// USER MANAGEMENT
// ============================================

export async function updateUserRole(userId: string, role: "USER" | "ADMIN") {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  // Prevent admin from demoting themselves
  if (userId === session.user.id && role === "USER") {
    throw new Error("You cannot demote yourself");
  }

  const user = await prisma.user.update({
    where: { id: userId },
    data: { role },
  });

  revalidatePath("/admin/users");
  return { success: true, user };
}

export async function updateUser(
  userId: string,
  data: {
    name: string;
    email: string;
    contact?: string;
    nid?: string;
  }
) {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  // Check if email is taken by another user
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  if (data.email !== user.email) {
    const existing = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existing) {
      throw new Error("Email already in use");
    }
  }

  // Check if NID is taken by another user
  if (data.nid && data.nid !== user.nid) {
    const existing = await prisma.user.findUnique({
      where: { nid: data.nid },
    });

    if (existing) {
      throw new Error("NID already in use");
    }
  }

  const updated = await prisma.user.update({
    where: { id: userId },
    data: {
      name: data.name,
      email: data.email,
      contact: data.contact || null,
      nid: data.nid || null,
    },
  });

  revalidatePath("/admin/users");
  return { success: true, user: updated };
}

export async function deleteUser(userId: string) {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  // Prevent admin from deleting themselves
  if (userId === session.user.id) {
    throw new Error("You cannot delete yourself");
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { _count: { select: { bookings: true } } },
  });

  if (!user) {
    throw new Error("User not found");
  }

  // Delete user (bookings will cascade delete due to schema)
  await prisma.user.delete({
    where: { id: userId },
  });

  revalidatePath("/admin/users");
  return { success: true };
}

export async function resetUserPassword(userId: string, newPassword: string) {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  const passwordHash = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: { id: userId },
    data: { passwordHash },
  });

  revalidatePath("/admin/users");
  return { success: true };
}

// ============================================
// REPORTS & ANALYTICS
// ============================================

export async function getServiceReport(startDate?: Date, endDate?: Date) {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  const whereClause =
    startDate && endDate
      ? {
          createdAt: {
            gte: startDate,
            lte: endDate,
          },
        }
      : {};

  const services = await prisma.service.findMany({
    include: {
      bookings: {
        where: whereClause,
        include: {
          payment: true,
        },
      },
      _count: {
        select: { bookings: true },
      },
    },
  });

  const report = services.map((service) => {
    const totalBookings = service.bookings.length;
    const completedBookings = service.bookings.filter(
      (b) => b.status === "COMPLETED"
    ).length;
    const totalRevenue = service.bookings.reduce((sum, booking) => {
      if (booking.payment && booking.payment.status === "succeeded") {
        return sum + booking.payment.amount;
      }
      return sum;
    }, 0);

    return {
      id: service.id,
      title: service.title,
      category: service.category,
      active: service.active,
      totalBookings,
      completedBookings,
      totalRevenue,
      baseRate: service.baseRate,
    };
  });

  return report;
}

export async function getSalesReport(startDate?: Date, endDate?: Date) {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  const whereClause =
    startDate && endDate
      ? {
          createdAt: {
            gte: startDate,
            lte: endDate,
          },
        }
      : {};

  const bookings = await prisma.booking.findMany({
    where: whereClause,
    include: {
      service: true,
      user: true,
      payment: true,
    },
    orderBy: { createdAt: "desc" },
  });

  const totalBookings = bookings.length;
  const totalRevenue = bookings.reduce((sum, booking) => {
    if (booking.payment && booking.payment.status === "succeeded") {
      return sum + booking.payment.amount;
    }
    return sum;
  }, 0);

  const bookingsByStatus = {
    PENDING: bookings.filter((b) => b.status === "PENDING").length,
    CONFIRMED: bookings.filter((b) => b.status === "CONFIRMED").length,
    COMPLETED: bookings.filter((b) => b.status === "COMPLETED").length,
    CANCELLED: bookings.filter((b) => b.status === "CANCELLED").length,
  };

  const bookingsByService = bookings.reduce(
    (acc, booking) => {
      const serviceTitle = booking.service.title;
      if (!acc[serviceTitle]) {
        acc[serviceTitle] = 0;
      }
      acc[serviceTitle]++;
      return acc;
    },
    {} as Record<string, number>
  );

  return {
    totalBookings,
    totalRevenue,
    bookingsByStatus,
    bookingsByService,
    bookings: bookings.map((b) => ({
      id: b.id,
      service: b.service.title,
      user: b.user.name,
      userEmail: b.user.email,
      status: b.status,
      totalCost: b.totalCost,
      paymentStatus: b.payment?.status || "unpaid",
      createdAt: b.createdAt,
    })),
  };
}
