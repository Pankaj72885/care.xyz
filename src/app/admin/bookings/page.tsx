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
import Link from "next/link";

// Server action wrapper for client component usage (or use client component)
// Since we want interactivity, let's make a small client component for the row actions
import { BookingStatusSelect } from "@/components/admin/booking-status-select";

export default async function AdminBookingsPage() {
  const bookings = await prisma.booking.findMany({
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
                <TableHead>Address</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    No bookings found.
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
                    <TableCell
                      className="max-w-[200px] truncate"
                      title={`${booking.address}, ${booking.city}, ${booking.district}`}
                    >
                      <div className="flex flex-col text-sm">
                        <span>{booking.address}</span>
                        <span className="text-muted-foreground text-xs">
                          {booking.city}, {booking.district}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {new Date(booking.createdAt).toLocaleDateString()}
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
