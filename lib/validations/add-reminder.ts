import { z } from "zod";

export const addReminderSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(30, "Title must be at most 30 characters"),
  date: z.date({
    required_error: "Date is required",
  }),
  time: z
    .string()
    .min(1, "Time is required"),
  city: z
    .string()
    .min(1, "City is required"),
}).refine((data) => data.date !== undefined, {
  message: "Date is required",
  path: ["date"],
});

export type AddReminderFormData = z.infer<typeof addReminderSchema>;
