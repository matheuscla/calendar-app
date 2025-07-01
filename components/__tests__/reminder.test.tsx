import { render, screen } from "@/lib/test-utils";
import Reminder from "@/components/reminder";

import { resetStores } from "@/lib/test-utils";

describe("Reminder", () => {
  beforeEach(() => {
    resetStores();
  });

  const baseReminder = {
    id: "1",
    title: "Doctor Appointment",
    date: "2024-06-01",
    time: "09:00",
    city: "New York",
    color: "#fff",
  };

  it("renders the reminder time and title", () => {
    render(<Reminder reminder={baseReminder as any} />);
    expect(screen.getByTestId("reminder-time")).toHaveTextContent("09:00");
    expect(screen.getByTestId("reminder-title")).toHaveTextContent(
      "Doctor Appointment"
    );
  });

  it("renders weather info if present", () => {
    const reminderWithWeather = {
      ...baseReminder,
      weather: {
        temperature: { min: 10, max: 20, unit: "C" },
        description: "Cloudy",
        icon: 6,
      },
    };
    render(<Reminder reminder={reminderWithWeather as any} />);
    expect(screen.getByTestId("reminder-weather")).toHaveTextContent(
      "10°C - 20°C"
    );
    expect(screen.getByTestId("reminder-weather")).toHaveTextContent("Cloudy");
  });
});
