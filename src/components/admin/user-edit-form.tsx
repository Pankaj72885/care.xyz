"use client";

import { updateUser } from "@/app/actions/admin";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface UserEditFormProps {
  user: {
    id: string;
    name: string;
    email: string;
    contact: string | null;
    nid: string | null;
  };
}

export function UserEditForm({ user }: UserEditFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    contact: user.contact || "",
    nid: user.nid || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateUser(user.id, formData);
      toast.success("User updated successfully");
      router.push("/admin/users");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to update user"
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
        <h1 className="text-3xl font-bold tracking-tight">Edit User</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>User Information</CardTitle>
          <CardDescription>Update user profile details</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact">Contact Number</Label>
              <Input
                id="contact"
                value={formData.contact}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, contact: e.target.value }))
                }
                placeholder="Optional"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="nid">National ID (NID)</Label>
              <Input
                id="nid"
                value={formData.nid}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, nid: e.target.value }))
                }
                placeholder="Optional"
              />
            </div>

            <div className="flex gap-4">
              <Button type="submit" disabled={loading}>
                {loading ? "Updating..." : "Update User"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/admin/users")}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
