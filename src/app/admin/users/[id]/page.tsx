import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { format } from "date-fns";
import { ArrowLeft, Mail, Phone, Shield, User } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function UserProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      bookings: {
        orderBy: { createdAt: "desc" },
        include: {
          service: { select: { title: true } },
        },
      },
      _count: {
        select: { bookings: true },
      },
    },
  });

  if (!user) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/bookings">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">User Profile</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>User contact and identity details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <User className="text-muted-foreground h-5 w-5" />
              <div>
                <p className="text-sm leading-none font-medium">Full Name</p>
                <p className="text-muted-foreground text-sm">{user.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="text-muted-foreground h-5 w-5" />
              <div>
                <p className="text-sm leading-none font-medium">Email</p>
                <p className="text-muted-foreground text-sm">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="text-muted-foreground h-5 w-5" />
              <div>
                <p className="text-sm leading-none font-medium">
                  Contact Number
                </p>
                <p className="text-muted-foreground text-sm">
                  {user.contact || "N/A"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Shield className="text-muted-foreground h-5 w-5" />
              <div>
                <p className="text-sm leading-none font-medium">Role</p>
                <div className="mt-1">
                  <Badge
                    variant={user.role === "ADMIN" ? "default" : "secondary"}
                  >
                    {user.role}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <p className="text-muted-foreground text-xs">
                Member since {format(user.createdAt, "MMMM d, yyyy")}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Account Statistics</CardTitle>
            <CardDescription>Overview of user activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1 rounded-lg border p-4">
                <span className="text-2xl font-bold">
                  {user._count.bookings}
                </span>
                <span className="text-muted-foreground text-sm">
                  Total Bookings
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Booking History</CardTitle>
          <CardDescription>
            Recent service requests by this user
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Service</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Cost</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {user.bookings.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-muted-foreground py-6 text-center"
                  >
                    No bookings found for this user.
                  </TableCell>
                </TableRow>
              ) : (
                user.bookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell className="font-medium">
                      {booking.service.title}
                    </TableCell>
                    <TableCell>
                      {format(booking.createdAt, "MMM d, yyyy")}
                    </TableCell>
                    <TableCell>BDT {booking.totalCost}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{booking.status}</Badge>
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
