import React from "react";
import { format, isToday } from "date-fns";
import { cn } from "@/lib/utils";

export default function CalendarDay({ day }: { day: Date }) {
  return (
    <button
      className={cn(
        "flex flex-col h-40 w-full items-start gap-1 p-2 text-left rounded-md border hover:bg-accent focus:outline-none",
        isToday(day) && "border-primary"
      )}
    >
      <span
        className={cn(
          "text-xs font-medium size-6 flex items-center justify-center rounded-full",
          isToday(day) && "text-white font-semibold bg-blue-500"
        )}
      >
        {format(day, "d")}
      </span>
    </button>
  );
}
