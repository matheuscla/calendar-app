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
    <div className="space-y-4 max-w-[1440px] mx-auto px-6 py-10">
      <div className="flex justify-end mb-10">
        <Button
          className="h-12 text-lg cursor-pointer"
          onClick={() => setIsReminderModalOpen(true)}
        >
          <Bell />
          New Reminder
        </Button>
      </div>
      <CalendarHeader />

      <div className="grid grid-cols-7 text-center text-sm text-gray-500">
        {days.map((day) => (
          <div key={day} className="font-medium">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {monthMatrix.map((day) => (
          <CalendarDay key={day.toISOString()} day={day} />
        ))}
      </div>

      <ReminderModal
        isOpen={isReminderModalOpen}
        onClose={() => setIsReminderModalOpen(false)}
      />
    </div>
  );
}
