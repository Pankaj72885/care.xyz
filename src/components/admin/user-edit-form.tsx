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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import * as bd from "@bangladeshi/bangladesh-address/build/src";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface UserEditFormProps {
  user: {
    id: string;
    name: string;
    email: string;
    contact: string | null;
    nid: string | null;
    division: string | null;
    district: string | null;
    upazila: string | null;
    address: string | null;
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
    division: user.division || "",
    district: user.district || "",
    upazila: user.upazila || "",
    address: user.address || "",
  });

  const [divisions, setDivisions] = useState<string[]>([]);
  const [districts, setDistricts] = useState<string[]>([]);
  const [upazilas, setUpazilas] = useState<string[]>([]);

  useEffect(() => {
    try {
      const allDivs = bd.allDivision();
      setDivisions(allDivs || []);
    } catch (e) {
      console.error("Failed to load divisions", e);
    }
  }, []);

  useEffect(() => {
    if (formData.division) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const dists = bd.districtsOf(formData.division as any);
      // dists might be objects or strings depending on library version, usually objects with name?
      // Exploring library behavior: often returns array of objects { name: "Dhaka", ... } or strings.
      // Assuming strings based on simple usage or objects having 'district' property.
      // Adjusting to handle potential object structure usually found in these libs.
      // If it returns objects, we map them.
      const distNames = Array.isArray(dists)
        ? dists.map((d) => {
            const item = d as { district?: string; name?: string } | string;
            return typeof item === "string"
              ? item
              : item.district || item.name || (item as string);
          })
        : [];
      setDistricts(distNames);
    } else {
      setDistricts([]);
    }
  }, [formData.division]);

  useEffect(() => {
    if (formData.district) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const upas = bd.upazilasOf(formData.district as any);
      const upaNames = Array.isArray(upas)
        ? upas.map((u) => {
            const item = u as { upazila?: string; name?: string } | string;
            return typeof item === "string"
              ? item
              : item.upazila || item.name || (item as string);
          })
        : [];
      setUpazilas(upaNames);
    } else {
      setUpazilas([]);
    }
  }, [formData.district]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (formData.nid && !/^(\d{10}|\d{13}|\d{17})$/.test(formData.nid)) {
        toast.error("NID must be 10, 13, or 17 digits");
        setLoading(false);
        return;
      }

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
            <div className="grid gap-4 md:grid-cols-2">
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
                    setFormData((prev) => ({
                      ...prev,
                      contact: e.target.value,
                    }))
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
            </div>

            <div className="space-y-2">
              <Label className="text-base font-semibold">
                Address Information
              </Label>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="division">Division</Label>
                  <Select
                    value={formData.division}
                    onValueChange={(value) =>
                      setFormData((prev) => ({
                        ...prev,
                        division: value,
                        district: "",
                        upazila: "",
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Division" />
                    </SelectTrigger>
                    <SelectContent>
                      {divisions.map((div) => (
                        <SelectItem key={div} value={div}>
                          {div}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="district">District</Label>
                  <Select
                    value={formData.district}
                    onValueChange={(value) =>
                      setFormData((prev) => ({
                        ...prev,
                        district: value,
                        upazila: "",
                      }))
                    }
                    disabled={!formData.division}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select District" />
                    </SelectTrigger>
                    <SelectContent>
                      {districts.map((dist) => (
                        <SelectItem key={dist} value={dist}>
                          {dist}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="upazila">Upazila</Label>
                  <Select
                    value={formData.upazila}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, upazila: value }))
                    }
                    disabled={!formData.district}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Upazila" />
                    </SelectTrigger>
                    <SelectContent>
                      {upazilas.map((upa) => (
                        <SelectItem key={upa} value={upa}>
                          {upa}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Full Address / Ward / House</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, address: e.target.value }))
                }
                placeholder="Area, House No, Road No, etc."
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
