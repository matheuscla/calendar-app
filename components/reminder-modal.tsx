import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/ui/date-picker";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  addReminderSchema,
  type AddReminderFormData,
} from "@/lib/validations/add-reminder";
import ErrorMessage from "./ui/error";
import { useCalendarStore } from "@/lib/store/calendarStore";

type ReminderModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ReminderModal({ isOpen, onClose }: ReminderModalProps) {
  const addReminder = useCalendarStore((state) => state.addReminder);
  const selectedReminder = useCalendarStore((state) => state.selectedReminder);
  const updateReminder = useCalendarStore((state) => state.updateReminder);
  const setSelectedReminder = useCalendarStore(
    (state) => state.setSelectedReminder
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<AddReminderFormData>({
    resolver: zodResolver(addReminderSchema),
    values: {
      title: selectedReminder?.title || "",
      date: selectedReminder?.date || new Date(),
      time: selectedReminder?.time || "",
      city: selectedReminder?.city || "",
    },
  });

  const selectedDateForm = watch("date");
  const selectedTime = watch("time");

  const handleOnClose = () => {
    onClose();
    setSelectedReminder(null);
  };

  const onSubmit = (data: AddReminderFormData) => {
    const reminderDate = data.date;

    if (reminderDate) {
      if (selectedReminder) {
        updateReminder(selectedReminder.id, {
          title: data.title,
          date: reminderDate,
          time: data.time,
          city: data.city,
        });
      } else {
        addReminder({
          title: data.title,
          date: reminderDate,
          time: data.time,
          city: data.city,
        });
      }

      reset();
      handleOnClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOnClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {selectedReminder ? "Edit Reminder" : "Add Reminder"}
          </DialogTitle>
          <DialogDescription>
            {selectedReminder
              ? "Edit your reminder details"
              : "Add a reminder for a specific date"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="title" className="mb-3">
              Reminder
            </Label>
            <Input
              id="title"
              {...register("title")}
              placeholder="Enter reminder title"
              aria-invalid={!!errors.title}
            />
            {errors.title && errors.title.message && (
              <ErrorMessage message={errors.title.message} />
            )}
          </div>

          <div>
            <DatePicker
              selected={selectedDateForm}
              onSelect={(date) => {
                if (date) {
                  setValue("date", date);
                }
              }}
              timeValue={selectedTime}
              onTimeChange={(time) => setValue("time", time)}
              isTimeInvalid={!!errors.time}
            />
            <input type="hidden" {...register("time")} />
            {errors.date && errors.date.message && (
              <ErrorMessage message={errors.date.message} />
            )}
            {errors.time && errors.time.message && (
              <ErrorMessage message={errors.time.message} />
            )}
          </div>

          <div>
            <Label htmlFor="city" className="mb-3">
              City
            </Label>
            <Input
              id="city"
              {...register("city")}
              placeholder="Enter city name"
              aria-invalid={!!errors.city}
            />
            {errors.city && errors.city.message && (
              <ErrorMessage message={errors.city.message} />
            )}
          </div>

          <DialogFooter>
            <Button type="submit" className="w-full h-12 font-semibold">
              {selectedReminder ? "Update Reminder" : "Add Reminder"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
