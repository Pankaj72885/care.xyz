"use client";

import { updateBookingStatus } from "@/app/actions/booking";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BookingStatus } from "@prisma/client";
import { useState } from "react";
import { toast } from "sonner";

interface BookingStatusSelectProps {
  bookingId: string;
  currentStatus: BookingStatus;
}

export function BookingStatusSelect({
  bookingId,
  currentStatus,
}: BookingStatusSelectProps) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<BookingStatus>(currentStatus);

  const handleStatusChange = async (newStatus: BookingStatus) => {
    // Optimistic update
    const previousStatus = status;
    setStatus(newStatus);
    setLoading(true);

    try {
      await updateBookingStatus(bookingId, newStatus);
      toast.success(`Booking status updated to ${newStatus}`);
    } catch (error) {
      // Revert on error
      setStatus(previousStatus);
      toast.error(
        error instanceof Error ? error.message : "Failed to update status"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Select
      value={status}
      onValueChange={(val) => handleStatusChange(val as BookingStatus)}
      disabled={loading}
    >
      <SelectTrigger className="w-[140px]">
        <SelectValue placeholder="Status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="PENDING">Pending</SelectItem>
        <SelectItem value="CONFIRMED">Confirmed</SelectItem>
        <SelectItem value="COMPLETED">Completed</SelectItem>
        <SelectItem value="CANCELLED">Cancelled</SelectItem>
      </SelectContent>
    </Select>
  );
}
