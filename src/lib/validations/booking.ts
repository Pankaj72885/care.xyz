import { z } from "zod";

export const durationUnitEnum = z.enum(["HOUR", "DAY"]);

export const bookingCreateSchema = z.object({
  serviceId: z.string().min(1, "Service ID is required"),
  durationUnit: durationUnitEnum,
  durationValue: z
    .number()
    .int("Duration must be an integer")
    .min(1, "Duration must be at least 1")
    .max(720, "Duration too long"), // cap to 30 days or 720 hours
  division: z.string().min(1, "Division is required"),
  district: z.string().min(1, "District is required"),
  city: z.string().min(1, "City is required"),
  area: z.string().min(1, "Area is required"),
  address: z.string().min(6, "Address is required"),
});

export type BookingCreateInput = z.infer<typeof bookingCreateSchema>;
