"use client";

import { createBooking } from "@/app/actions/booking";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
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
import { Textarea } from "@/components/ui/textarea";
import {
  BookingCreateInput,
  bookingCreateSchema,
} from "@/lib/validations/booking";
import * as bd from "@bangladeshi/bangladesh-address/build/src";
import { zodResolver } from "@hookform/resolvers/zod";
import { Service } from "@prisma/client";
import { differenceInHours, format } from "date-fns";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface BookingFormProps {
  service: Service;
  userId: string;
}

const steps = ["Schedule", "Location", "Review"];

export function BookingForm({ service }: BookingFormProps) {
  const [step, setStep] = useState(0);
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

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

  const form = useForm<BookingCreateInput>({
    resolver: zodResolver(bookingCreateSchema),
    defaultValues: {
      serviceId: service.id,
      durationUnit: "HOUR" as const,
      durationValue: 2,
      division: "",
      district: "",
      city: "",
      area: "",
      address: "",
      startTime: undefined,
      endTime: undefined,
    },
    mode: "onChange",
  });

  const { watch, setValue } = form;
  const watchData = watch();
  const currentDivision = watchData.division;
  const currentDistrict = watchData.district;
  const startTime = watchData.startTime;
  const endTime = watchData.endTime;

  // Derived state for cost
  const totalCost = watchData.durationValue * service.baseRate;

  // Calculate duration when start/end time changes
  useEffect(() => {
    if (startTime && endTime) {
      const start = new Date(startTime);
      const end = new Date(endTime);
      if (!isNaN(start.getTime()) && !isNaN(end.getTime())) {
        const diff = differenceInHours(end, start);
        if (diff > 0) {
          setValue("durationValue", Math.ceil(diff));
          setValue("durationUnit", diff > 24 ? "DAY" : "HOUR");
        }
      }
    }
  }, [startTime, endTime, setValue]);

  // Location logic
  useEffect(() => {
    if (currentDivision) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const dists = bd.districtsOf(currentDivision as any);
      const distNames = Array.isArray(dists)
        ? dists.map((d: { district?: string; name?: string } | string) =>
            typeof d === "string" ? d : d.district || d.name || (d as string)
          )
        : [];
      setDistricts(distNames);
      setValue("district", "");
      setValue("city", ""); // Reset city/upazila
    } else {
      setDistricts([]);
    }
  }, [currentDivision, setValue]);

  useEffect(() => {
    if (currentDistrict) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const upas = bd.upazilasOf(currentDistrict as any);
      const upaNames = Array.isArray(upas)
        ? upas.map((u: { upazila?: string; name?: string } | string) =>
            typeof u === "string" ? u : u.upazila || u.name || (u as string)
          )
        : [];
      setUpazilas(upaNames);
      setValue("city", ""); // Reset city/upazila
    } else {
      setUpazilas([]);
    }
  }, [currentDistrict, setValue]);

  // Handle step navigation
  const nextStep = async () => {
    let fieldsToValidate: (keyof BookingCreateInput)[] = [];
    if (step === 0) {
      fieldsToValidate = [
        "startTime",
        "endTime",
        "durationValue",
        "durationUnit",
      ];
    } else if (step === 1) {
      fieldsToValidate = ["division", "district", "city", "area", "address"];
    }

    const isValid = await form.trigger(fieldsToValidate);
    if (isValid) {
      setStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
  };

  async function onSubmit(data: BookingCreateInput) {
    setIsPending(true);
    try {
      const result = await createBooking({ ...data, totalCost });
      if (result.success && result.bookingId) {
        router.push(`/payment/${result.bookingId}`);
      } else {
        form.setError("root", {
          message: result.error || "Failed to create booking",
        });
      }
    } catch {
      form.setError("root", { message: "Something went wrong" });
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="md:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>Book {service.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6 flex items-center justify-between">
              {steps.map((s, i) => (
                <div
                  key={s}
                  className={`flex items-center ${i <= step ? "text-primary font-bold" : "text-gray-400"}`}
                >
                  <div
                    className={`mr-2 flex h-6 w-6 items-center justify-center rounded-full border ${i <= step ? "bg-primary border-primary text-white" : "border-gray-300"}`}
                  >
                    {i + 1}
                  </div>
                  <span className="hidden text-sm sm:inline">{s}</span>
                </div>
              ))}
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                {/* STEP 1: SCHEDULE */}
                {step === 0 && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="startTime"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>From</FormLabel>
                            <FormControl>
                              <Input
                                type="datetime-local"
                                {...field}
                                value={
                                  field.value instanceof Date &&
                                  !isNaN(field.value.getTime())
                                    ? format(field.value, "yyyy-MM-dd'T'HH:mm")
                                    : ""
                                }
                                onChange={(e) => {
                                  const date = new Date(e.target.value);
                                  if (!isNaN(date.getTime())) {
                                    field.onChange(date);
                                  } else if (e.target.value === "") {
                                    field.onChange(undefined);
                                  }
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="endTime"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>To</FormLabel>
                            <FormControl>
                              <Input
                                type="datetime-local"
                                {...field}
                                value={
                                  field.value instanceof Date &&
                                  !isNaN(field.value.getTime())
                                    ? format(field.value, "yyyy-MM-dd'T'HH:mm")
                                    : ""
                                }
                                onChange={(e) => {
                                  const date = new Date(e.target.value);
                                  if (!isNaN(date.getTime())) {
                                    field.onChange(date);
                                  } else if (e.target.value === "") {
                                    field.onChange(undefined);
                                  }
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="rounded-md bg-blue-50 p-4 text-blue-900">
                      <p className="text-sm font-medium">
                        Estimated Duration: {watchData.durationValue}{" "}
                        {watchData.durationUnit?.toLowerCase()}(s)
                      </p>
                      <p className="mt-1 text-xs text-blue-700">
                        Minimum 1 hour charge. Duration is rounded up.
                      </p>
                    </div>
                  </div>
                )}

                {/* STEP 2: LOCATION */}
                {step === 1 && (
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="division"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Division</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select division" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {divisions.map((d) => (
                                <SelectItem key={d} value={d}>
                                  {d}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="district"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>District</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              disabled={!watchData.division}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select district" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {districts.map((d: string) => (
                                  <SelectItem key={d} value={d}>
                                    {d}
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
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Upazila/Thana</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              disabled={!watchData.district}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select Upazila" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {upazilas.map((u) => (
                                  <SelectItem key={u} value={u}>
                                    {u}
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
                      name="area"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Area/Neighborhood</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="e.g. Road 12, Block B"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Address</FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              placeholder="House no, Flat no, details..."
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                {/* STEP 3: REVIEW */}
                {step === 2 && (
                  <div className="space-y-4">
                    <div className="bg-muted space-y-2 rounded-md p-4 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Service</span>
                        <span className="font-medium">{service.title}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">From</span>
                        <span className="font-medium">
                          {watchData.startTime
                            ? format(watchData.startTime, "PPp")
                            : "-"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">To</span>
                        <span className="font-medium">
                          {watchData.endTime
                            ? format(watchData.endTime, "PPp")
                            : "-"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Duration</span>
                        <span className="font-medium">
                          {watchData.durationValue} {watchData.durationUnit}(s)
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Location</span>
                        <span className="text-right font-medium">
                          {watchData.address}, {watchData.area},{" "}
                          {watchData.division}
                        </span>
                      </div>
                      <div className="mt-2 flex justify-between border-t pt-2 text-lg font-bold">
                        <span>Total Cost</span>
                        <span>BDT {totalCost}</span>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-xs">
                      By clicking confirm, checking out with Stripe, you agree
                      to our terms of service.
                    </p>
                  </div>
                )}

                {form.formState.errors.root && (
                  <p className="text-destructive text-sm">
                    {form.formState.errors.root.message}
                  </p>
                )}

                <div className="mt-6 flex justify-between">
                  {step > 0 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={prevStep}
                      disabled={isPending}
                    >
                      Back
                    </Button>
                  )}
                  {step < steps.length - 1 ? (
                    <Button
                      type="button"
                      className="ml-auto"
                      onClick={nextStep}
                    >
                      Next
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      className="ml-auto"
                      disabled={isPending}
                    >
                      {isPending ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : null}
                      Confirm Booking
                    </Button>
                  )}
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>

      {/* SUMMARY PANEL (Visible on Desktop) */}
      <div className="hidden md:col-span-1 md:block">
        <Card>
          <CardHeader>
            <CardTitle>Booking Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Base Rate</span>
              <span>
                BDT {service.baseRate} / {watchData.durationUnit.toLowerCase()}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Duration</span>
              <span>x {watchData.durationValue}</span>
            </div>
            <div className="flex justify-between border-t pt-4 text-xl font-bold">
              <span>Total</span>
              <span>BDT {totalCost}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
