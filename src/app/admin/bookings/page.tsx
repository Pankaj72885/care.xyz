import { BookingFilter } from "@/components/admin/booking-filter";
import { BookingStatusSelect } from "@/components/admin/booking-status-select";
import { BookingStatusBadge } from "@/components/booking-status-badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { prisma } from "@/lib/prisma";
import { BookingStatus, Prisma } from "@prisma/client";
import { format } from "date-fns";
import Link from "next/link";

interface AdminBookingsPageProps {
  searchParams: Promise<{
    service?: string;
    location?: string;
    date?: string;
    status?: string;
  }>;
}

export default async function AdminBookingsPage({
  searchParams,
}: AdminBookingsPageProps) {
  const params = await searchParams;
  const where: Prisma.BookingWhereInput = {};

  // Service Filter
  if (params.service) {
    where.service = {
      title: {
        contains: params.service,
        mode: "insensitive",
      },
    };
  }

  // Location Filter (Search across district, city, address)
  if (params.location) {
    where.OR = [
      { district: { contains: params.location, mode: "insensitive" } },
      { city: { contains: params.location, mode: "insensitive" } },
      { address: { contains: params.location, mode: "insensitive" } },
    ];
  }

  // Date Filter (Check if booking overlaps with the selected date)
  if (params.date) {
    const searchDate = new Date(params.date);
    const nextDate = new Date(searchDate);
    nextDate.setDate(nextDate.getDate() + 1);

    where.startTime = {
      gte: searchDate,
      lt: nextDate,
    };
  }

  // Status Filter
  if (params.status && params.status !== "ALL") {
    where.status = params.status as BookingStatus;
  }

  const bookings = await prisma.booking.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          contact: true,
        },
      },
      service: {
        select: {
          title: true,
        },
      },
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">
          Booking Management
        </h1>
      </div>

      <BookingFilter />

      <Card>
        <CardHeader>
          <CardTitle>All Bookings</CardTitle>
          <CardDescription>
            Manage and update status for all system bookings.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Booking ID</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Schedule</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    No bookings found matching your filters.
                  </TableCell>
                </TableRow>
              ) : (
                bookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell className="font-mono text-xs">
                      {booking.id.slice(-6).toUpperCase()}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <Link
                          href={`/admin/users/${booking.user.id}`}
                          className="font-medium hover:underline"
                        >
                          {booking.user.name}
                        </Link>
                        <span className="text-muted-foreground text-xs">
                          {booking.user.email}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{booking.service.title}</TableCell>
                    <TableCell>
                      <div className="flex flex-col text-sm">
                        <span className="font-medium">
                          {booking.startTime
                            ? format(booking.startTime, "PP")
                            : "N/A"}
                        </span>
                        <span className="text-muted-foreground text-xs">
                          {booking.startTime
                            ? format(booking.startTime, "p")
                            : ""}
                          {" - "}
                          {booking.endTime ? format(booking.endTime, "p") : ""}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell
                      className="max-w-[200px] truncate"
                      title={`${booking.address}, ${booking.city}, ${booking.district}`}
                    >
                      <div className="flex flex-col text-sm">
                        <span>{booking.district}</span>
                        <span className="text-muted-foreground text-xs">
                          {booking.city}, {booking.area}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <BookingStatusBadge status={booking.status} />
                    </TableCell>
                    <TableCell className="text-right">
                      <BookingStatusSelect
                        bookingId={booking.id}
                        currentStatus={booking.status}
                      />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
