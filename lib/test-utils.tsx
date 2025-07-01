import React, { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { useCalendarStore } from "@/lib/store/calendarStore";
import { useModalsStore } from "@/lib/store/modalsStore";

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

export const resetStores = () => {
  useCalendarStore.setState({
    currentMonth: new Date(),
    monthMatrix: [],
    reminders: [],
    selectedReminder: null,
    goToNextMonth: () => {},
    goToPrevMonth: () => {},
    addReminder: () => {},
    updateReminder: () => {},
    getRemindersForDate: () => [],
    setSelectedReminder: () => {},
  });

  useModalsStore.setState({
    isReminderModalOpen: false,
    setIsReminderModalOpen: () => {},
  });
};

export * from "@testing-library/react";
export { customRender as render };
