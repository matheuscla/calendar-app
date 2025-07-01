"use client";
import CalendarDay from "@/components/calendar-day";
import CalendarHeader from "@/components/calendar-header";
import ReminderModal from "@/components/reminder-modal";
import { Button } from "@/components/ui/button";
import { useCalendarStore } from "@/lib/store/calendarStore";
import { useModalsStore } from "@/lib/store/modalsStore";
import { Bell } from "lucide-react";

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export default function Home() {
  const { isReminderModalOpen, setIsReminderModalOpen } = useModalsStore();
  const { monthMatrix } = useCalendarStore();

  return (
    <div className="space-y-4 max-w-[1440px] mx-auto px-4 sm:px-6 py-6 sm:py-10">
      <div className="flex justify-end mb-6 sm:mb-10">
        <Button
          className="h-10 sm:h-12 text-base sm:text-lg cursor-pointer"
          onClick={() => setIsReminderModalOpen(true)}
        >
          <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="hidden sm:inline">New Reminder</span>
          <span className="sm:hidden">Reminder</span>
        </Button>
      </div>
      <CalendarHeader />

      <div className="overflow-x-auto">
        <div className="min-w-[600px] sm:min-w-full">
          <div className="grid grid-cols-7 text-center text-xs sm:text-sm text-gray-500">
            {days.map((day) => (
              <div key={day} className="font-medium px-1">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {monthMatrix.map((day) => (
              <CalendarDay key={day.toISOString()} day={day} />
            ))}
          </div>
        </div>
      </div>

      <ReminderModal
        isOpen={isReminderModalOpen}
        onClose={() => setIsReminderModalOpen(false)}
      />
    </div>
  );
}
