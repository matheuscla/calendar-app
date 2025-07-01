import { create } from 'zustand';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays } from 'date-fns';
import { AddReminderFormData } from '@/lib/validations/add-reminder';

export interface Reminder extends AddReminderFormData {
  id: string;
  weather?: {
    temperature: {
      min: number;
      max: number;
      unit: string;
    };
    description: string;
    icon: number;
  };
}

type CalendarState = {
  currentMonth: Date;
  monthMatrix: Date[];
  reminders: Reminder[];
  goToNextMonth: () => void;
  goToPrevMonth: () => void;
  addReminder: (reminder: Omit<Reminder, 'id' | 'createdAt'>) => void;
  updateReminder: (id: string, reminder: Partial<Omit<Reminder, 'id' | 'createdAt'>>) => void;
  getRemindersForDate: (date: Date) => Reminder[];
  selectedReminder: Reminder | null;
  setSelectedReminder: (reminder: Reminder | null) => void;
};

export const useCalendarStore = create<CalendarState>((set, get) => {
  const computeMonthMatrix = (baseDate: Date): Date[] => {
    const start = startOfWeek(startOfMonth(baseDate), { weekStartsOn: 0 });
    const end = endOfWeek(endOfMonth(baseDate), { weekStartsOn: 0 });

    const days = [];
    let current = start;
    while (current <= end) {
      days.push(current);
      current = addDays(current, 1);
    }
    return days;
  };

  const initialDate = new Date();

  return {
    currentMonth: initialDate,
    monthMatrix: computeMonthMatrix(initialDate),
    reminders: [],
    selectedReminder: null,
    
    goToNextMonth: () => {
      const newDate = new Date(get().currentMonth.getFullYear(), get().currentMonth.getMonth() + 1);
      set({ currentMonth: newDate, monthMatrix: computeMonthMatrix(newDate) });
    },
    
    goToPrevMonth: () => {
      const newDate = new Date(get().currentMonth.getFullYear(), get().currentMonth.getMonth() - 1);
      set({ currentMonth: newDate, monthMatrix: computeMonthMatrix(newDate) });
    },
    
    addReminder: (reminderData) => {
      const newReminder: Reminder = {
        ...reminderData,
        id: crypto.randomUUID(),
      };
      
      set((state) => ({
        reminders: [...state.reminders, newReminder],
      }));
    },
    
    updateReminder: (id, updatedData) => {
      set((state) => ({
        reminders: state.reminders.map((reminder) =>
          reminder.id === id ? { ...reminder, ...updatedData } : reminder
        ),
      }));
    },

    setSelectedReminder: (reminder: Reminder | null) => {
      set({ selectedReminder: reminder });
    },
    
    getRemindersForDate: (date) => {
      const { reminders } = get();
      return reminders.filter((reminder) => {
        const reminderDate = new Date(reminder.date);
        return (
          reminderDate.getFullYear() === date.getFullYear() &&
          reminderDate.getMonth() === date.getMonth() &&
          reminderDate.getDate() === date.getDate()
        );
      });
    },
  };
});
