"use client";

import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCalendarStore } from "@/lib/store/calendarStore";

export default function CalendarHeader() {
  const { currentMonth, goToNextMonth, goToPrevMonth } = useCalendarStore();

  return (
    <div
      data-testid="calendar-header"
      className="flex items-center justify-between px-2"
    >
      <Button
        data-testid="calendar-prev-month"
        variant="ghost"
        size="icon"
        onClick={goToPrevMonth}
      >
        <ChevronLeft className="size-4" />
      </Button>

      <h2 data-testid="calendar-month-year" className="text-lg font-semibold">
        {format(currentMonth, "MMMM yyyy")}
      </h2>

      <Button
        data-testid="calendar-next-month"
        variant="ghost"
        size="icon"
        onClick={goToNextMonth}
      >
        <ChevronRight className="size-4" />
      </Button>
    </div>
  );
}
