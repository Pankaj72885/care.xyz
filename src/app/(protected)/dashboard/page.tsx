import { getUserBookings } from "@/app/actions/booking";
import { auth } from "@/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, Clock } from "lucide-react";

export default async function DashboardPage() {
  const session = await auth();
  const bookings = await getUserBookings();

  const totalBookings = bookings.length;
  const activeBookings = bookings.filter(
    (b) => b.status === "CONFIRMED" || b.status === "PENDING"
  ).length; // PENDING is technically active/in-progress of booking logic
  // Let's say CONFIRMED is active properly.
  // Actually, usually status is PENDING -> CONFIRMED -> COMPLETED | CANCELLED
  const upcomingBookings = bookings.filter(
    (b) => b.status === "CONFIRMED"
  ).length;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Overview</h3>
        <p className="text-muted-foreground text-sm">
          Welcome back, {session?.user?.name}
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Bookings
            </CardTitle>
            <CalendarDays className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalBookings}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Upcoming Services
            </CardTitle>
            <Clock className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingBookings}</div>
          </CardContent>
        </Card>
        {/* Placeholder for Payment stats if we had payment db queries easier */}
      </div>
    </div>
  );
}
