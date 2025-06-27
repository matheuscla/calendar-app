import React from "react";

type Reminder = {
  id: string;
  date: Date;
  time: string;
  title: string;
  city: string;
};

export default function Reminder({ reminder }: { reminder: Reminder }) {
  return (
    <div className="text-xs flex font-mediu items-center gap-1 bg-neutral-900 rounded-md py-1 px-2 text-zinc-100 w-fit">
      <span>{reminder.time}</span>
      <span>{reminder.title}</span>
    </div>
  );
}
