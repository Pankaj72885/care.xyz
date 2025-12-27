import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { prisma } from "@/lib/prisma";
import {
  BarChart3,
  DollarSign,
  Package,
  ShoppingCart,
  TrendingUp,
  Users,
} from "lucide-react";

export default async function AdminReportsPage() {
  // Get all services with bookings and payments
  const services = await prisma.service.findMany({
    include: {
      bookings: {
        include: {
          payment: true,
        },
      },
      _count: {
        select: { bookings: true },
      },
    },
  });

  // Get all bookings for sales report
  const bookings = await prisma.booking.findMany({
    include: {
      service: true,
      user: true,
      payment: true,
    },
    orderBy: { createdAt: "desc" },
  });

  const totalUsers = await prisma.user.count();
  const totalBookings = bookings.length;
  const totalRevenue = bookings.reduce((sum, booking) => {
    if (booking.payment && booking.payment.status === "succeeded") {
      return sum + booking.payment.amount;
    }
    return sum;
  }, 0);

  // Service performance report
  const serviceReport = services.map((service) => {
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

  // Booking status breakdown
  const bookingsByStatus = {
    PENDING: bookings.filter((b) => b.status === "PENDING").length,
    CONFIRMED: bookings.filter((b) => b.status === "CONFIRMED").length,
    COMPLETED: bookings.filter((b) => b.status === "COMPLETED").length,
    CANCELLED: bookings.filter((b) => b.status === "CANCELLED").length,
  };

  // Top services by revenue
  const topServicesByRevenue = [...serviceReport]
    .sort((a, b) => b.totalRevenue - a.totalRevenue)
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">
          Reports & Analytics
        </h1>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsers}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Bookings
            </CardTitle>
            <ShoppingCart className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalBookings}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">BDT {totalRevenue}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Services
            </CardTitle>
            <Package className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {services.filter((s) => s.active).length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Booking Status Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Booking Status Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="space-y-2">
              <p className="text-muted-foreground text-sm">Pending</p>
              <p className="text-2xl font-bold">{bookingsByStatus.PENDING}</p>
            </div>
            <div className="space-y-2">
              <p className="text-muted-foreground text-sm">Confirmed</p>
              <p className="text-2xl font-bold">{bookingsByStatus.CONFIRMED}</p>
            </div>
            <div className="space-y-2">
              <p className="text-muted-foreground text-sm">Completed</p>
              <p className="text-2xl font-bold">{bookingsByStatus.COMPLETED}</p>
            </div>
            <div className="space-y-2">
              <p className="text-muted-foreground text-sm">Cancelled</p>
              <p className="text-2xl font-bold">{bookingsByStatus.CANCELLED}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Service Performance Report */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Service Performance Report
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Service</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Total Bookings</TableHead>
                  <TableHead className="text-right">Completed</TableHead>
                  <TableHead className="text-right">Revenue</TableHead>
                  <TableHead className="text-right">Base Rate</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {serviceReport.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="py-8 text-center">
                      No service data available.
                    </TableCell>
                  </TableRow>
                ) : (
                  serviceReport.map((service) => (
                    <TableRow key={service.id}>
                      <TableCell className="font-medium">
                        {service.title}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {service.category}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={service.active ? "default" : "secondary"}
                        >
                          {service.active ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {service.totalBookings}
                      </TableCell>
                      <TableCell className="text-right">
                        {service.completedBookings}
                      </TableCell>
                      <TableCell className="text-right">
                        BDT {service.totalRevenue}
                      </TableCell>
                      <TableCell className="text-right">
                        BDT {service.baseRate}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Top Services by Revenue */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Top Services by Revenue
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topServicesByRevenue.map((service, index) => (
              <div
                key={service.id}
                className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-primary text-primary-foreground flex h-8 w-8 items-center justify-center rounded-full">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium">{service.title}</p>
                    <p className="text-muted-foreground text-sm">
                      {service.totalBookings} bookings •{" "}
                      {service.completedBookings} completed
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold">BDT {service.totalRevenue}</p>
                  <p className="text-muted-foreground text-sm">
                    Base: BDT {service.baseRate}
                  </p>
                </div>
              </div>
            ))}
            {topServicesByRevenue.length === 0 && (
              <p className="text-muted-foreground text-center">
                No revenue data available.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
