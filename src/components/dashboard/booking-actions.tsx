"use client";

import { cancelBooking } from "@/app/actions/booking";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

interface BookingActionsProps {
  bookingId: string;
  status: string;
}

export function BookingActions({ bookingId, status }: BookingActionsProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleCancel = () => {
    startTransition(async () => {
      await cancelBooking(bookingId);
      // Optional: show toast
    });
  };

  const handlePay = () => {
    router.push(`/payment/${bookingId}`);
  };

  if (status === "CANCELLED" || status === "COMPLETED") {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {status === "PENDING" && (
          <DropdownMenuItem onClick={handlePay}>Pay Now</DropdownMenuItem>
        )}
        {(status === "PENDING" || status === "CONFIRMED") && (
          <DropdownMenuItem
            onClick={handleCancel}
            disabled={isPending}
            className="text-destructive focus:text-destructive"
          >
            {isPending ? "Cancelling..." : "Cancel Booking"}
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
