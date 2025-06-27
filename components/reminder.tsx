import { useCalendarStore } from "@/lib/store/calendarStore";
import { useModalsStore } from "@/lib/store/modalsStore";
import { Pencil } from "lucide-react";
import React from "react";

type Reminder = {
  id: string;
  date: Date;
  time: string;
  title: string;
  city: string;
};

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
      className="text-xs flex font-mediu items-center gap-1 bg-neutral-900 rounded-md py-1 px-2 text-zinc-100 w-fit cursor-pointer hover:bg-neutral-800 transition-colors group"
    >
      <span>{reminder.time}</span>
      <span>{reminder.title}</span>
      <Pencil className="size-3 opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
}
