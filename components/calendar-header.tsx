"use client";

import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

export default function CalendarHeader() {
  const [month, setMonth] = useState(new Date());

  const handlePrevMonth = () => {
    const newDate = new Date(month);
    newDate.setMonth(newDate.getMonth() - 1);
    setMonth(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(month);
    newDate.setMonth(newDate.getMonth() + 1);
    setMonth(newDate);
  };

  return (
    <div className="flex items-center justify-between px-2">
      <Button variant="ghost" size="icon" onClick={handlePrevMonth}>
        <ChevronLeft className="size-4" />
      </Button>

      <h2 className="text-lg font-semibold">{format(month, "MMMM yyyy")}</h2>

      <Button variant="ghost" size="icon" onClick={handleNextMonth}>
        <ChevronRight className="size-4" />
      </Button>
    </div>
  );
}
