import React from "react";
import { format, isToday, isWeekend } from "date-fns";
import { cn, filterAndSortReminders } from "@/lib/utils";
import { useCalendarStore } from "@/lib/store/calendarStore";
import Reminder from "./reminder";

export default function CalendarDay({ day }: { day: Date }) {
  const reminders = useCalendarStore((state) => state.reminders);

  const dayReminders = filterAndSortReminders(reminders, day);

  return (
    <button
      className={cn(
        "flex flex-col h-40 w-full items-start gap-1 p-2 text-left rounded-md border hover:bg-accent focus:outline-none",
        isToday(day) && "border-primary",
        isWeekend(day) && "bg-gray-50"
      )}
    >
      <span
        className={cn(
          "text-xs font-medium size-6 flex items-center justify-center rounded-full",
          isToday(day) && "text-white font-semibold bg-blue-500 mb-2"
        )}
      >
        {format(day, "d")}
      </span>

      <div className="space-y-2 overflow-y-auto overflow-x-auto">
        {dayReminders.map((reminder) => (
          <Reminder key={reminder.id} reminder={reminder} />
        ))}
      </div>
    </button>
  );
}
