"use client";

import { deleteUser } from "@/app/actions/admin";
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

export function DeleteUserClient({
  user,
}: {
  user: {
    id: string;
    name: string;
    email: string;
    _count: { bookings: number };
  };
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteUser(user.id);
      toast.success("User deleted successfully");
      router.push("/admin/users");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to delete user"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/users">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Users
          </Button>
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">Delete User</h1>
      </div>

      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="text-destructive flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Confirm Deletion
          </CardTitle>
          <CardDescription>
            This action cannot be undone. This will permanently delete the user
            and all their bookings.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted rounded-lg border p-4">
            <p className="font-medium">User: {user.name}</p>
            <p className="text-muted-foreground text-sm">Email: {user.email}</p>
            <p className="text-muted-foreground text-sm">
              Total Bookings: {user._count.bookings}
            </p>
          </div>

          {user._count.bookings > 0 && (
            <div className="rounded-lg border border-yellow-500 bg-yellow-50 p-4 dark:bg-yellow-950">
              <p className="font-medium text-yellow-800 dark:text-yellow-200">
                ⚠️ Warning
              </p>
              <p className="text-muted-foreground text-sm">
                This user has {user._count.bookings} booking(s). Deleting this
                user will also delete all their bookings and related data.
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex gap-4">
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete User"}
          </Button>
          <Button variant="outline" onClick={() => router.push("/admin/users")}>
            Cancel
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
