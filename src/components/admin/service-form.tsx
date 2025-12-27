"use client";

import { createService, updateService } from "@/app/actions/admin";
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
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface ServiceFormProps {
  service?: {
    id: string;
    title: string;
    slug: string;
    description: string;
    category: string;
    baseRate: number;
  };
  mode: "create" | "edit";
}

export function ServiceForm({ service, mode }: ServiceFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: service?.title || "",
    slug: service?.slug || "",
    description: service?.description || "",
    category: service?.category || "baby",
    baseRate: service?.baseRate || 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === "create") {
        await createService(formData);
        toast.success("Service created successfully");
      } else {
        await updateService(service!.id, formData);
        toast.success("Service updated successfully");
      }
      router.push("/admin/services");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  };

  const handleTitleChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      title: value,
      slug: mode === "create" ? generateSlug(value) : prev.slug,
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {mode === "create" ? "Create New Service" : "Edit Service"}
        </CardTitle>
        <CardDescription>
          {mode === "create"
            ? "Add a new caregiving service to the platform"
            : "Update service information"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Service Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="e.g., Baby Care"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">Slug (URL-friendly name)</Label>
            <Input
              id="slug"
              value={formData.slug}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, slug: e.target.value }))
              }
              placeholder="e.g., baby-care"
              required
            />
            <p className="text-muted-foreground text-sm">
              This will be used in the URL: /services/{formData.slug || "slug"}
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select
              value={formData.category}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, category: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="baby">Baby Care</SelectItem>
                <SelectItem value="elderly">Elderly Care</SelectItem>
                <SelectItem value="sick">Post-Operative Care</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              placeholder="Describe the service..."
              rows={4}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="baseRate">Base Rate (BDT per hour/day)</Label>
            <Input
              id="baseRate"
              type="number"
              min="0"
              step="1"
              value={formData.baseRate}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  baseRate: parseInt(e.target.value) || 0,
                }))
              }
              placeholder="e.g., 500"
              required
            />
          </div>

          <div className="flex gap-4">
            <Button type="submit" disabled={loading}>
              {loading
                ? mode === "create"
                  ? "Creating..."
                  : "Updating..."
                : mode === "create"
                  ? "Create Service"
                  : "Update Service"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/admin/services")}
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
