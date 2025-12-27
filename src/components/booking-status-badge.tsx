import { Badge } from "@/components/ui/badge";
import { BookingStatus } from "@prisma/client";

export function BookingStatusBadge({ status }: { status: BookingStatus }) {
  const getVariant = (status: BookingStatus) => {
    switch (status) {
      case "PENDING":
        return "secondary"; // yellow-ish usually handled via custom class or secondary
      case "CONFIRMED":
        return "default"; // primary/green
      case "COMPLETED":
        return "outline"; // generic
      case "CANCELLED":
        return "destructive"; // red
      default:
        return "secondary";
    }
  };

  const getCustomClass = (status: BookingStatus) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-200";
      case "CONFIRMED":
        return "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-200";
      case "COMPLETED":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-200";
      case "CANCELLED":
        return "bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900 dark:text-red-200";
      default:
        return "";
    }
  };

  return (
    <Badge
      variant="outline"
      className={`border-none ${getCustomClass(status)}`}
    >
      {status}
    </Badge>
  );
}
