import { getUserBookings } from "@/app/actions/booking";
import { auth } from "@/auth";
import { BookingActions } from "@/components/dashboard/booking-actions";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";

export default async function BookingsPage() {
  const session = await auth();
  const bookings = await getUserBookings();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">My Bookings</h3>
        <p className="text-muted-foreground text-sm">
          Manage your service appointments and payments.
        </p>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Service</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Cost</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No bookings found.
                </TableCell>
              </TableRow>
            ) : (
              bookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell className="font-medium">
                    {booking.service.title}
                  </TableCell>
                  <TableCell>
                    {format(new Date(booking.createdAt), "PP")}
                  </TableCell>
                  <TableCell>
                    {booking.durationValue} {booking.durationUnit}(s)
                  </TableCell>
                  <TableCell>BDT {booking.totalCost}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        booking.status === "CONFIRMED"
                          ? "default"
                          : booking.status === "COMPLETED"
                            ? "secondary"
                            : booking.status === "PENDING"
                              ? "outline"
                              : "destructive"
                      }
                    >
                      {booking.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <BookingActions
                      bookingId={booking.id}
                      status={booking.status}
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
