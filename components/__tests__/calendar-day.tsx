import { render, screen } from "@/lib/test-utils";
import CalendarDay from "@/components/calendar-day";
import { useCalendarStore } from "@/lib/store/calendarStore";
import { resetStores } from "@/lib/test-utils";

describe("CalendarDay", () => {
  beforeEach(() => {
    resetStores();
  });

  it("renders the day number correctly", () => {
    const testDate = new Date(Date.UTC(2024, 0, 15, 12, 0, 0));
    render(<CalendarDay day={testDate} />);

    expect(screen.getByTestId("calendar-day-number")).toHaveTextContent("15");
  });

  it("applies today styling when the day is today", () => {
    const today = new Date();
    render(<CalendarDay day={today} />);

    const dayElement = screen.getByTestId("calendar-day-number");
    expect(dayElement).toHaveClass(
      "text-white",
      "font-semibold",
      "bg-blue-500"
    );
  });

  it("applies weekend styling for weekend days", () => {
    const weekendDate = new Date(Date.UTC(2024, 0, 7, 12, 0, 0));
    render(<CalendarDay day={weekendDate} />);

    const dayButton = screen.getByTestId("calendar-day");
    expect(dayButton).toHaveClass("bg-gray-50");
  });

  it("renders without reminders initially", () => {
    const testDate = new Date(Date.UTC(2024, 0, 15, 12, 0, 0));
    render(<CalendarDay day={testDate} />);

    expect(screen.getByTestId("calendar-day-number")).toHaveTextContent("15");
    expect(screen.queryByTestId("reminder")).not.toBeInTheDocument();
  });

  it("renders reminders when they exist for the day", () => {
    const testDate = new Date(Date.UTC(2024, 0, 15, 12, 0, 0));
    const reminders = [
      {
        id: "1",
        title: "Doctor Appointment",
        date: new Date(Date.UTC(2024, 0, 15, 12, 0, 0)),
        time: "09:00",
        city: "New York",
      },
      {
        id: "2",
        title: "Team Meeting",
        date: new Date(Date.UTC(2024, 0, 15, 12, 0, 0)),
        time: "14:00",
        city: "San Francisco",
      },
    ];

    useCalendarStore.setState({ reminders });

    render(<CalendarDay day={testDate} />);

    expect(screen.getByText("Doctor Appointment")).toBeInTheDocument();
    expect(screen.getByText("Team Meeting")).toBeInTheDocument();
  });

  it("does not render reminders for other days", () => {
    const testDate = new Date(Date.UTC(2024, 0, 15, 12, 0, 0));
    const reminders = [
      {
        id: "1",
        title: "Doctor Appointment",
        date: new Date(Date.UTC(2024, 0, 16, 12, 0, 0)),
        time: "09:00",
        city: "New York",
      },
    ];

    useCalendarStore.setState({ reminders });

    render(<CalendarDay day={testDate} />);

    expect(screen.queryByText("Doctor Appointment")).not.toBeInTheDocument();
  });

  it("renders reminders with weather information", () => {
    const testDate = new Date(Date.UTC(2024, 0, 15, 12, 0, 0));
    const reminders = [
      {
        id: "1",
        title: "Outdoor Event",
        date: new Date(Date.UTC(2024, 0, 15, 12, 0, 0)),
        time: "10:00",
        city: "New York",
        weather: {
          temperature: { min: 10, max: 20, unit: "C" },
          description: "Sunny",
          icon: 1,
        },
      },
    ];

    useCalendarStore.setState({ reminders });

    render(<CalendarDay day={testDate} />);

    expect(screen.getByText("Outdoor Event")).toBeInTheDocument();
    expect(screen.getByText("10°C - 20°C")).toBeInTheDocument();
    expect(screen.getByText("Sunny")).toBeInTheDocument();
  });

  it("handles multiple reminders with scrolling", () => {
    const testDate = new Date(Date.UTC(2024, 0, 15, 12, 0, 0));
    const reminders = Array.from({ length: 10 }, (_, i) => ({
      id: `${i + 1}`,
      title: `Reminder ${i + 1}`,
      date: new Date(Date.UTC(2024, 0, 15, 12, 0, 0)),
      time: `${i + 9}:00`,
      city: "New York",
    }));

    useCalendarStore.setState({ reminders });

    render(<CalendarDay day={testDate} />);

    reminders.forEach((reminder) => {
      expect(screen.getByText(reminder.title)).toBeInTheDocument();
    });

    const remindersContainer = screen.getByTestId("calendar-day-reminders");
    expect(remindersContainer).toBeInTheDocument();
  });
});
