"use client";

import { updateUserRole } from "@/app/actions/admin";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export function UserRoleForm({
  user,
}: {
  user: {
    id: string;
    name: string;
    email: string;
    role: "USER" | "ADMIN";
  };
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState<"USER" | "ADMIN">(user.role);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateUserRole(user.id, role);
      toast.success("User role updated successfully");
      router.push("/admin/users");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to update role"
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
        <h1 className="text-3xl font-bold tracking-tight">Change User Role</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Update User Role</CardTitle>
          <CardDescription>
            Change the role for {user.name} ({user.email})
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select
                value={role}
                onValueChange={(value) => setRole(value as "USER" | "ADMIN")}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USER">USER</SelectItem>
                  <SelectItem value="ADMIN">ADMIN</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-muted-foreground text-sm">
                {role === "ADMIN"
                  ? "Admin users have full access to the admin panel"
                  : "Regular users can only access their own dashboard"}
              </p>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex gap-4">
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Updating..." : "Update Role"}
          </Button>
          <Button variant="outline" onClick={() => router.push("/admin/users")}>
            Cancel
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
