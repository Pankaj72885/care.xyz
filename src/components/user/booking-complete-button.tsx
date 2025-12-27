"use client";

import { completeBooking } from "@/app/actions/booking";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function BookingCompleteButton({ bookingId }: { bookingId: string }) {
  const [loading, setLoading] = useState(false);

  const handleComplete = async () => {
    setLoading(true);
    try {
      await completeBooking(bookingId);
      toast.success("Booking marked as completed!");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to complete booking"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      size="sm"
      variant="outline"
      className="text-green-600 hover:bg-green-50 hover:text-green-700 dark:hover:bg-green-900/20"
      onClick={handleComplete}
      disabled={loading}
    >
      <CheckCircle className="mr-2 h-4 w-4" />
      {loading ? "Completing..." : "Mark as Completed"}
    </Button>
  );
}
