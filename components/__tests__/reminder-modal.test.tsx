import { render, screen, fireEvent, waitFor } from "@/lib/test-utils";
import ReminderModal from "@/components/reminder-modal";
import { useCalendarStore } from "@/lib/store/calendarStore";
import { resetStores } from "@/lib/test-utils";

describe("ReminderModal", () => {
  beforeEach(() => {
    resetStores();
  });

  const mockOnClose = jest.fn();

  it("renders add reminder modal when no selected reminder", () => {
    render(<ReminderModal isOpen={true} onClose={mockOnClose} />);

    expect(
      screen.getByRole("heading", { name: "Add Reminder" })
    ).toBeInTheDocument();
    expect(
      screen.getByText("Add a reminder for a specific date")
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Enter reminder title")
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter city name")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Add Reminder" })
    ).toBeInTheDocument();
  });

  it("renders edit reminder modal when selected reminder exists", () => {
    const selectedReminder = {
      id: "1",
      title: "Doctor Appointment",
      date: new Date("2024-06-01"),
      time: "09:00",
      city: "New York",
    };

    useCalendarStore.setState({ selectedReminder });

    render(<ReminderModal isOpen={true} onClose={mockOnClose} />);

    expect(
      screen.getByRole("heading", { name: "Edit Reminder" })
    ).toBeInTheDocument();
    expect(screen.getByText("Edit your reminder details")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Doctor Appointment")).toBeInTheDocument();
    expect(screen.getByDisplayValue("New York")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Update Reminder" })
    ).toBeInTheDocument();
  });

  it("does not render when isOpen is false", () => {
    render(<ReminderModal isOpen={false} onClose={mockOnClose} />);

    expect(
      screen.queryByRole("heading", { name: "Add Reminder" })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "Edit Reminder" })
    ).not.toBeInTheDocument();
  });

  it("shows validation errors for empty required fields", async () => {
    render(<ReminderModal isOpen={true} onClose={mockOnClose} />);

    const submitButton = screen.getByRole("button", { name: "Add Reminder" });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Title is required")).toBeInTheDocument();
      expect(screen.getByText("Time is required")).toBeInTheDocument();
      expect(screen.getByText("City is required")).toBeInTheDocument();
    });
  });

  it("submits form with valid data", async () => {
    const addReminder = jest.fn();
    useCalendarStore.setState({ addReminder });

    render(<ReminderModal isOpen={true} onClose={mockOnClose} />);

    fireEvent.change(screen.getByPlaceholderText("Enter reminder title"), {
      target: { value: "Test Reminder" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter city name"), {
      target: { value: "New York" },
    });

    const timeInput = screen.getByLabelText("Time");
    fireEvent.change(timeInput, { target: { value: "10:00" } });

    const submitButton = screen.getByRole("button", { name: "Add Reminder" });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(addReminder).toHaveBeenCalledWith({
        title: "Test Reminder",
        city: "New York",
        time: "10:00",
        date: expect.any(Date),
      });
    });
  });

  it("calls onClose when modal is closed", () => {
    render(<ReminderModal isOpen={true} onClose={mockOnClose} />);

    const closeButton = screen.getByRole("button", { name: /close/i });
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalled();
  });

  it("resets form when modal is closed and reopened", () => {
    const { rerender } = render(
      <ReminderModal isOpen={true} onClose={mockOnClose} />
    );

    fireEvent.change(screen.getByPlaceholderText("Enter reminder title"), {
      target: { value: "Test Reminder" },
    });

    rerender(<ReminderModal isOpen={false} onClose={mockOnClose} />);

    rerender(<ReminderModal isOpen={true} onClose={mockOnClose} />);

    expect(screen.getByPlaceholderText("Enter reminder title")).toHaveValue("");
  });
});
