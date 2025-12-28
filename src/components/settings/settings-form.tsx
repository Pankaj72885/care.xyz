"use client";

import * as bd from "@bangladeshi/bangladesh-address/build/src";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const settingsSchema = z.object({
  name: z.string().min(1, "Name is required"),
  nid: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^(\d{10}|\d{13}|\d{17})$/.test(val),
      "NID must be 10, 13, or 17 digits"
    ),
  contact: z
    .string()
    .optional()
    .refine((val) => !val || /^\d{11}$/.test(val), "Contact must be 11 digits"),
  division: z.string().optional(),
  district: z.string().optional(),
  upazila: z.string().optional(),
  address: z.string().optional(),
});

type SettingsValues = z.infer<typeof settingsSchema>;

interface SettingsFormProps {
  user: {
    name: string;
    nid: string | null;
    contact: string | null;
    email: string;
    role: string;
    division?: string | null;
    district?: string | null;
    upazila?: string | null;
    address?: string | null;
  };
}

export function SettingsForm({ user }: SettingsFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [divisions, setDivisions] = useState<string[]>([]);
  const [districts, setDistricts] = useState<string[]>([]);
  const [upazilas, setUpazilas] = useState<string[]>([]);

  const form = useForm<SettingsValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      name: user.name || "",
      nid: user.nid || "",
      contact: user.contact || "",
      division: user.division || "",
      district: user.district || "",
      upazila: user.upazila || "",
      address: user.address || "",
    },
  });

  const { watch, setValue } = form;
  const currentDivision = watch("division");
  const currentDistrict = watch("district");

  useEffect(() => {
    try {
      const allDivs = bd.allDivision();
      setDivisions(allDivs || []);
    } catch (e) {
      console.error("Failed to load divisions", e);
    }
  }, []);

  useEffect(() => {
    if (currentDivision) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const dists = bd.districtsOf(currentDivision as any);
      const distNames = Array.isArray(dists)
        ? dists.map((d: string | { district?: string; name?: string }) =>
            typeof d === "string" ? d : d.district || d.name || ""
          )
        : [];
      setDistricts(distNames);
      // Reset dependent fields if they don't match the new list (optional, but good UX)
      // Actually, if division changes, we should reset district value unless we are careful.
      // But here we rely on the component user to manually change or we force it.
      // Let's force reset if the current district is not in the new list?
      // Simplified: Just update list. User will see invalid or have to re-select.
      // Better:
      // if (!distNames.includes(currentDistrict || "")) { setValue("district", ""); setValue("upazila", ""); }
    } else {
      setDistricts([]);
    }
  }, [currentDivision]);

  useEffect(() => {
    if (currentDistrict) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const upas = bd.upazilasOf(currentDistrict as any);
      const upaNames = Array.isArray(upas)
        ? upas.map((u: string | { upazila?: string; name?: string }) =>
            typeof u === "string" ? u : u.upazila || u.name || ""
          )
        : [];
      setUpazilas(upaNames);
    } else {
      setUpazilas([]);
    }
  }, [currentDistrict]);

  function onSubmit(data: SettingsValues) {
    startTransition(async () => {
      try {
        const response = await fetch("/api/user/update", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          if (response.status === 409) {
            toast.error("NID already in use");
            return;
          }
          throw new Error("Something went wrong");
        }

        toast.success("Settings updated successfully");
        router.refresh();
      } catch {
        toast.error("Failed to update settings");
      }
    });
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>
            Update your account details and personal information.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid gap-2">
                <label className="text-sm font-medium">Email</label>
                <Input value={user.email} disabled className="bg-muted" />
                <p className="text-muted-foreground text-[0.8rem]">
                  Email cannot be changed.
                </p>
              </div>

              <div className="grid gap-2">
                <label className="text-sm font-medium">Role</label>
                <Input
                  value={user.role}
                  disabled
                  className="bg-muted capitalize"
                />
              </div>

              <FormField
                control={form.control}
                name="nid"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>NID No</FormLabel>
                    <FormControl>
                      <Input placeholder="National ID Number" {...field} />
                    </FormControl>
                    <FormDescription>Your National ID number.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contact"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact</FormLabel>
                    <FormControl>
                      <Input placeholder="+880..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-3 pt-2">
                <h3 className="text-sm font-medium">Address</h3>
                <div className="grid gap-4 md:grid-cols-3">
                  <FormField
                    control={form.control}
                    name="division"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Division</FormLabel>
                        <Select
                          onValueChange={(val) => {
                            field.onChange(val);
                            setValue("district", "");
                            setValue("upazila", "");
                          }}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select Division" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {divisions.map((div) => (
                              <SelectItem key={div} value={div}>
                                {div}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="district"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>District</FormLabel>
                        <Select
                          onValueChange={(val) => {
                            field.onChange(val);
                            setValue("upazila", "");
                          }}
                          defaultValue={field.value}
                          disabled={!currentDivision}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select District" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {districts.map((dist) => (
                              <SelectItem key={dist} value={dist}>
                                {dist}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="upazila"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Upazila</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          disabled={!currentDistrict}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select Upazila" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {upazilas.map((upa) => (
                              <SelectItem key={upa} value={upa}>
                                {upa}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Address</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="House, Road, Block, etc."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-end">
                <Button type="submit" disabled={isPending}>
                  {isPending && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Save Changes
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
