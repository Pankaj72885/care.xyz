"use client";

import { deleteService } from "@/app/actions/admin";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertTriangle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export function DeleteServiceClient({
  service,
}: {
  service: {
    id: string;
    title: string;
    _count: { bookings: number };
  };
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteService(service.id);
      toast.success("Service deleted successfully");
      router.push("/admin/services");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to delete service"
      );
    } finally {
      setLoading(false);
    }
  };

  const hasBookings = service._count.bookings > 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/services">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Services
          </Button>
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">Delete Service</h1>
      </div>

      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="text-destructive flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Confirm Deletion
          </CardTitle>
          <CardDescription>
            This action cannot be undone. This will permanently delete the
            service.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted rounded-lg border p-4">
            <p className="font-medium">Service: {service.title}</p>
            <p className="text-muted-foreground text-sm">
              Total Bookings: {service._count.bookings}
            </p>
          </div>

          {hasBookings && (
            <div className="border-destructive bg-destructive/10 rounded-lg border p-4">
              <p className="text-destructive font-medium">
                ⚠️ Cannot Delete Service
              </p>
              <p className="text-muted-foreground text-sm">
                This service has {service._count.bookings} existing booking(s).
                You cannot delete a service with bookings. Please deactivate it
                instead.
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex gap-4">
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={loading || hasBookings}
          >
            {loading ? "Deleting..." : "Delete Service"}
          </Button>
          <Button
            variant="outline"
            onClick={() => router.push("/admin/services")}
          >
            Cancel
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
