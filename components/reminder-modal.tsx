import React, { useEffect, useState } from "react";
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
import { getCityWeather } from "@/lib/services/accuweather";
import { Loader2 } from "lucide-react";

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

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<AddReminderFormData>({
    resolver: zodResolver(addReminderSchema),
    defaultValues: {
      title: "",
      date: new Date(),
      time: "",
      city: "",
    },
  });

  const selectedDateForm = watch("date");
  const selectedTime = watch("time");

  useEffect(() => {
    if (isOpen) {
      if (selectedReminder) {
        reset({
          title: selectedReminder.title,
          date: selectedReminder.date,
          time: selectedReminder.time,
          city: selectedReminder.city,
        });
      } else {
        reset({
          title: "",
          date: new Date(),
          time: "",
          city: "",
        });
      }
    }
  }, [isOpen, selectedReminder, reset]);

  const handleOnClose = () => {
    onClose();
    setSelectedReminder(null);
  };

  const onSubmit = async (data: AddReminderFormData) => {
    const reminderDate = data.date;

    if (reminderDate) {
      setIsLoading(true);

      try {
        const weatherData = await getCityWeather(data.city, reminderDate);

        let reminderData: {
          title: string;
          date: Date;
          time: string;
          city: string;
          weather?: {
            temperature: {
              min: number;
              max: number;
              unit: string;
            };
            description: string;
            icon: number;
          };
        } = {
          title: data.title,
          date: reminderDate,
          time: data.time,
          city: data.city,
        };

        if (weatherData) {
          const forecast = weatherData.weather.DailyForecasts[0];
          reminderData = {
            ...reminderData,
            weather: {
              temperature: {
                min: forecast.Temperature.Minimum.Value,
                max: forecast.Temperature.Maximum.Value,
                unit: forecast.Temperature.Maximum.Unit,
              },
              description: forecast.Day.IconPhrase,
              icon: forecast.Day.Icon,
            },
          };
        }

        if (selectedReminder) {
          updateReminder(selectedReminder.id, reminderData);
        } else {
          addReminder(reminderData);
        }

        reset();
        handleOnClose();
      } catch (error) {
        console.error("Error fetching weather data:", error);

        const reminderData = {
          title: data.title,
          date: reminderDate,
          time: data.time,
          city: data.city,
        };

        if (selectedReminder) {
          updateReminder(selectedReminder.id, reminderData);
        } else {
          addReminder(reminderData);
        }

        reset();
        handleOnClose();
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOnClose}>
      <DialogContent data-testid="reminder-modal">
        <DialogHeader>
          <DialogTitle data-testid="reminder-modal-title">
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
              data-testid="reminder-title-input"
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
              data-testid="reminder-date-picker"
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
              data-testid="reminder-city-input"
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
            <Button
              data-testid="reminder-submit-button"
              type="submit"
              className="w-full h-12 font-semibold"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {selectedReminder ? "Updating..." : "Adding..."}
                </>
              ) : selectedReminder ? (
                "Update Reminder"
              ) : (
                "Add Reminder"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
