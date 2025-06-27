import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function filterAndSortReminders(reminders: { id: string, date: Date; time: string, title: string, city: string }[], day: Date) {
  return reminders
    .filter((reminder) => {
      const reminderDate = new Date(reminder.date);
      return (
        reminderDate.getFullYear() === day.getFullYear() &&
        reminderDate.getMonth() === day.getMonth() &&
        reminderDate.getDate() === day.getDate()
      );
    })
    .sort((a, b) => a.time.localeCompare(b.time));
}
