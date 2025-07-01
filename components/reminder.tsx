import { useCalendarStore, type Reminder } from "@/lib/store/calendarStore";
import { useModalsStore } from "@/lib/store/modalsStore";
import { Pencil, Cloud, Thermometer } from "lucide-react";
import React from "react";

export default function Reminder({ reminder }: { reminder: Reminder }) {
  const setSelectedReminder = useCalendarStore(
    (state) => state.setSelectedReminder
  );
  const setIsReminderModalOpen = useModalsStore(
    (state) => state.setIsReminderModalOpen
  );

  const handleEditReminder = () => {
    setSelectedReminder(reminder);
    setIsReminderModalOpen(true);
  };

  return (
    <div
      onClick={handleEditReminder}
      className="text-xs flex flex-col font-medium bg-neutral-900 rounded-md py-1 px-2 text-zinc-100 w-fit cursor-pointer hover:bg-neutral-800 transition-colors group"
    >
      <div className="flex items-center gap-1">
        <span>{reminder.time}</span>
        <span>{reminder.title}</span>
        <Pencil className="size-3 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {reminder.weather && (
        <div className="flex items-center gap-1 mt-1 text-[10px] text-zinc-300">
          <Thermometer className="size-2" />
          <span>
            {reminder.weather.temperature.min}°
            {reminder.weather.temperature.unit} -{" "}
            {reminder.weather.temperature.max}°
            {reminder.weather.temperature.unit}
          </span>
          <Cloud className="size-2" />
          <span>{reminder.weather.description}</span>
        </div>
      )}
    </div>
  );
}
