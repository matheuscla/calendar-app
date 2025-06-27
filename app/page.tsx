"use client";
import CalendarDay from "@/components/calendar-day";
import CalendarHeader from "@/components/calendar-header";
import { useCalendarStore } from "@/lib/store/calendarStore";

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
  const { monthMatrix } = useCalendarStore();

  return (
    <div className="space-y-4 max-w-[1440px] mx-auto px-6">
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
    </div>
  );
}
