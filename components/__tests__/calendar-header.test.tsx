import { render, screen, fireEvent } from "@/lib/test-utils";
import CalendarHeader from "@/components/calendar-header";
import { useCalendarStore } from "@/lib/store/calendarStore";
import { resetStores } from "@/lib/test-utils";

describe("CalendarHeader", () => {
  beforeEach(() => {
    resetStores();
  });

  it("renders the current month and year correctly", () => {
    const testDate = new Date("2024-01-15");
    useCalendarStore.setState({ currentMonth: testDate });

    render(<CalendarHeader />);

    expect(screen.getByTestId("calendar-month-year")).toHaveTextContent(
      "January 2024"
    );
  });

  it("renders navigation buttons", () => {
    render(<CalendarHeader />);

    expect(screen.getByTestId("calendar-prev-month")).toBeInTheDocument();
    expect(screen.getByTestId("calendar-next-month")).toBeInTheDocument();
  });

  it("calls goToPrevMonth when previous button is clicked", () => {
    const goToPrevMonth = jest.fn();
    useCalendarStore.setState({ goToPrevMonth });

    render(<CalendarHeader />);

    const prevButton = screen.getByTestId("calendar-prev-month");
    fireEvent.click(prevButton);

    expect(goToPrevMonth).toHaveBeenCalledTimes(1);
  });

  it("calls goToNextMonth when next button is clicked", () => {
    const goToNextMonth = jest.fn();
    useCalendarStore.setState({ goToNextMonth });

    render(<CalendarHeader />);

    const nextButton = screen.getByTestId("calendar-next-month");
    fireEvent.click(nextButton);

    expect(goToNextMonth).toHaveBeenCalledTimes(1);
  });

  it("displays different months when navigating", () => {
    const goToPrevMonth = jest.fn();
    const goToNextMonth = jest.fn();
    useCalendarStore.setState({
      currentMonth: new Date("2024-06-15"),
      goToPrevMonth,
      goToNextMonth,
    });

    render(<CalendarHeader />);

    expect(screen.getByTestId("calendar-month-year")).toHaveTextContent(
      "June 2024"
    );

    const nextButton = screen.getByTestId("calendar-next-month");
    fireEvent.click(nextButton);

    expect(goToNextMonth).toHaveBeenCalledTimes(1);

    const prevButton = screen.getByTestId("calendar-prev-month");
    fireEvent.click(prevButton);

    expect(goToPrevMonth).toHaveBeenCalledTimes(1);
  });

  it("handles year transitions correctly", () => {
    const testDate = new Date("2024-12-15");
    useCalendarStore.setState({ currentMonth: testDate });

    render(<CalendarHeader />);

    expect(screen.getByTestId("calendar-month-year")).toHaveTextContent(
      "December 2024"
    );
  });
});
