import { act } from '@testing-library/react';
import { useCalendarStore } from '../calendarStore';

describe('useCalendarStore', () => {
  beforeEach(() => {
    useCalendarStore.setState({
      currentMonth: new Date(),
      monthMatrix: useCalendarStore.getState().monthMatrix,
      reminders: [],
      selectedReminder: null,
    });
  });

  it('should have correct initial state', () => {
    const state = useCalendarStore.getState();
    expect(state.currentMonth).toBeInstanceOf(Date);
    expect(Array.isArray(state.monthMatrix)).toBe(true);
    expect(state.reminders).toEqual([]);
    expect(state.selectedReminder).toBeNull();
  });

  it('should go to next and previous month', () => {
    const initialMonth = new Date(2024, 0, 1);
    useCalendarStore.setState({ currentMonth: initialMonth, monthMatrix: useCalendarStore.getState().monthMatrix });
    act(() => {
      useCalendarStore.getState().goToNextMonth();
    });
    expect(useCalendarStore.getState().currentMonth.getMonth()).toBe(1);
    act(() => {
      useCalendarStore.getState().goToPrevMonth();
    });
    expect(useCalendarStore.getState().currentMonth.getMonth()).toBe(0);
  });

  it('should add a reminder', () => {
    const reminder = {
      title: 'Test',
      date: new Date(2024, 5, 10),
      time: '10:00',
      city: 'NY',
    };
    act(() => {
      useCalendarStore.getState().addReminder(reminder);
    });
    const reminders = useCalendarStore.getState().reminders;
    expect(reminders.length).toBe(1);
    expect(reminders[0].title).toBe('Test');
    expect(reminders[0].id).toBeDefined();
  });

  it('should update a reminder', () => {
    const reminder = {
      title: 'Test',
      date: new Date(2024, 5, 10),
      time: '10:00',
      city: 'NY',
    };
    act(() => {
      useCalendarStore.getState().addReminder(reminder);
    });
    const id = useCalendarStore.getState().reminders[0].id;
    act(() => {
      useCalendarStore.getState().updateReminder(id, { title: 'Updated' });
    });
    expect(useCalendarStore.getState().reminders[0].title).toBe('Updated');
  });

  it('should set and clear selectedReminder', () => {
    const reminder = {
      title: 'Test',
      date: new Date(2024, 5, 10),
      time: '10:00',
      city: 'NY',
    };
    act(() => {
      useCalendarStore.getState().addReminder(reminder);
    });
    const r = useCalendarStore.getState().reminders[0];
    act(() => {
      useCalendarStore.getState().setSelectedReminder(r);
    });
    expect(useCalendarStore.getState().selectedReminder).toEqual(r);
    act(() => {
      useCalendarStore.getState().setSelectedReminder(null);
    });
    expect(useCalendarStore.getState().selectedReminder).toBeNull();
  });

  it('should get reminders for a specific date', () => {
    const date = new Date(2024, 5, 10);
    const reminder1 = {
      title: 'Test1',
      date,
      time: '10:00',
      city: 'NY',
    };
    const reminder2 = {
      title: 'Test2',
      date: new Date(2024, 5, 11),
      time: '11:00',
      city: 'LA',
    };
    act(() => {
      useCalendarStore.getState().addReminder(reminder1);
      useCalendarStore.getState().addReminder(reminder2);
    });
    const found = useCalendarStore.getState().getRemindersForDate(date);
    expect(found.length).toBe(1);
    expect(found[0].title).toBe('Test1');
  });
});
