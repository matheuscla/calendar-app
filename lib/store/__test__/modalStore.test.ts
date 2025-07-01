import { act } from '@testing-library/react';
import { useModalsStore } from '../modalsStore';

describe('useModalsStore', () => {
  beforeEach(() => {
    useModalsStore.setState({ isReminderModalOpen: false });
  });

  it('should have isReminderModalOpen as false by default', () => {
    expect(useModalsStore.getState().isReminderModalOpen).toBe(false);
  });

  it('should set isReminderModalOpen to true', () => {
    act(() => {
      useModalsStore.getState().setIsReminderModalOpen(true);
    });
    expect(useModalsStore.getState().isReminderModalOpen).toBe(true);
  });

  it('should set isReminderModalOpen to false', () => {
    act(() => {
      useModalsStore.getState().setIsReminderModalOpen(true);
    });
    expect(useModalsStore.getState().isReminderModalOpen).toBe(true);
    act(() => {
      useModalsStore.getState().setIsReminderModalOpen(false);
    });
    expect(useModalsStore.getState().isReminderModalOpen).toBe(false);
  });
});
