import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import {
  ArrowRight,
  BarChart3,
  CalendarDays,
  CreditCard,
  DollarSign,
  Layers,
  Users,
} from "lucide-react";
import Link from "next/link";

export default async function AdminDashboardPage() {
  const totalBookings = await prisma.booking.count();
  const totalUsers = await prisma.user.count();
  const activeServices = await prisma.service.count({
    where: { active: true },
  });

  const revenueAgg = await prisma.payment.aggregate({
    _sum: { amount: true },
    where: { status: "succeeded" },
  });
  const totalRevenue = revenueAgg._sum.amount || 0;

  // Recent bookings
  const recentBookings = await prisma.booking.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: {
      user: { select: { name: true, email: true } },
      service: { select: { title: true } },
    },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
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
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsers}</div>
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
            <Layers className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeServices}</div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Navigation */}
      <div className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Quick Navigation</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Link href="/admin/services">
            <Card className="hover:border-primary transition-all hover:shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Layers className="h-5 w-5" />
                  Services
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-3 text-sm">
                  Manage services, create new ones, and toggle availability
                </p>
                <Button variant="ghost" size="sm" className="group">
                  Manage Services
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/users">
            <Card className="hover:border-primary transition-all hover:shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Users className="h-5 w-5" />
                  Users
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-3 text-sm">
                  View all users, edit profiles, and manage roles
                </p>
                <Button variant="ghost" size="sm" className="group">
                  Manage Users
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/payments">
            <Card className="hover:border-primary transition-all hover:shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <CreditCard className="h-5 w-5" />
                  Payments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-3 text-sm">
                  View transactions, receipts, and payment status
                </p>
                <Button variant="ghost" size="sm" className="group">
                  View Payments
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/reports">
            <Card className="hover:border-primary transition-all hover:shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <BarChart3 className="h-5 w-5" />
                  Reports
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-3 text-sm">
                  View analytics, service performance, and revenue reports
                </p>
                <Button variant="ghost" size="sm" className="group">
                  View Reports
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentBookings.length === 0 ? (
                <p className="text-muted-foreground">No bookings yet.</p>
              ) : (
                recentBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                  >
                    <div>
                      <p className="font-medium">{booking.service.title}</p>
                      <p className="text-muted-foreground text-sm">
                        by {booking.user.name} ({booking.user.email})
                      </p>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="font-medium">
                        {new Date(booking.createdAt).toLocaleDateString()}
                      </span>
                      <span
                        className={`rounded-full px-2 py-1 text-xs ${
                          booking.status === "CONFIRMED"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : booking.status === "PENDING"
                              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                              : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
