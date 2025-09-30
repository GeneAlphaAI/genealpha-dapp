// ProgressBar.test.jsx
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import FrameProgress from "../../components/dashboard/FrameProgress";

describe("FrameProgress", () => {
  test("renders countdown when timeLeft > 0", () => {
    render(<FrameProgress progress={25} timeLeft={3661000} />); // ~1h 1s
    expect(screen.getByText(/Closing in/i)).toBeInTheDocument();
    // It should include days, hours, minutes, seconds
    expect(screen.getByText(/0d/i)).toBeInTheDocument();
    expect(screen.getByText(/1h/i)).toBeInTheDocument();
  });

  test("renders 'Closed' when timeLeft = 0", () => {
    render(<FrameProgress progress={10} timeLeft={0} />);
    expect(screen.getByText("Closed")).toBeInTheDocument();
  });

  test("displays progress percentage with no decimals", () => {
    render(<FrameProgress progress={33.7} timeLeft={5000} />);
    expect(screen.getByText("34%")).toBeInTheDocument();
  });

  test("renders green bar when progress >= 50", () => {
    render(<FrameProgress progress={75} timeLeft={5000} />);
    const bar = screen.getByTestId("progress-bar");
    expect(bar).toHaveStyle({ backgroundColor: "#6CCB70", width: "75%" });
  });

  test("renders light green bar when progress < 50", () => {
    render(<FrameProgress progress={25} timeLeft={5000} />);
    const bar = screen.getByTestId("progress-bar");
    expect(bar).toHaveStyle({ backgroundColor: "#CBEACC", width: "25%" });
  });

  test("progress bar width updates correctly", () => {
    const { rerender } = render(
      <FrameProgress progress={10} timeLeft={5000} />
    );
    const bar = screen.getByTestId("progress-bar");
    expect(bar).toHaveStyle({ width: "10%" });

    rerender(<FrameProgress progress={60} timeLeft={5000} />);
    expect(screen.getByTestId("progress-bar")).toHaveStyle({ width: "60%" });
  });
});
