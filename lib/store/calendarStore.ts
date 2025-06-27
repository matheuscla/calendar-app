import { create } from 'zustand';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays } from 'date-fns';

type CalendarState = {
  currentMonth: Date;
  monthMatrix: Date[];
  goToNextMonth: () => void;
  goToPrevMonth: () => void;
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
    goToNextMonth: () => {
      const newDate = new Date(get().currentMonth.getFullYear(), get().currentMonth.getMonth() + 1);
      set({ currentMonth: newDate, monthMatrix: computeMonthMatrix(newDate) });
    },
    goToPrevMonth: () => {
      const newDate = new Date(get().currentMonth.getFullYear(), get().currentMonth.getMonth() - 1);
      set({ currentMonth: newDate, monthMatrix: computeMonthMatrix(newDate) });
    },
  };
});
