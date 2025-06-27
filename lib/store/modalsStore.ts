import { create } from 'zustand';

type ModalsStore = {
  isReminderModalOpen: boolean;
  setIsReminderModalOpen: (isOpen: boolean) => void;
};

export const useModalsStore = create<ModalsStore>((set) => ({
  isReminderModalOpen: false,

  setIsReminderModalOpen: (isOpen: boolean) => set({ isReminderModalOpen: isOpen }),
}));

