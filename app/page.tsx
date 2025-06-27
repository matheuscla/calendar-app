import CalendarDay from "@/components/calendar-day";
import CalendarHeader from "@/components/calendar-header";
import {
  startOfWeek,
  startOfMonth,
  endOfWeek,
  endOfMonth,
  addDays,
} from "date-fns";

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const monthMatrix = (currentMonth: Date) => {
  const start = startOfWeek(startOfMonth(currentMonth), { weekStartsOn: 0 });
  const end = endOfWeek(endOfMonth(currentMonth), { weekStartsOn: 0 });

  const days = [];
  let day = start;

  while (day <= end) {
    days.push(day);
    day = addDays(day, 1);
  }

  return days;
};

export default function Home() {
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
        {monthMatrix(new Date()).map((day) => (
          <CalendarDay key={day.toISOString()} day={day} />
        ))}
      </div>
    </div>
  );
}
