// src/__tests__/RangeSlider.test.jsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import RangeSlider from "../../components/form/RangeSlider";

describe("RangeSlider", () => {
  const defaultProps = {
    label: "Test Slider",
    description: "Slider Description",
    min: 0,
    max: 100,
    step: 5,
    value: 50,
    defaultValue: 50,
    onChange: jest.fn(),
    onReset: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders label and description", () => {
    render(<RangeSlider {...defaultProps} />);
    expect(screen.getByText("Test Slider")).toBeInTheDocument();
    expect(screen.getByText("Slider Description")).toBeInTheDocument();
  });

  it("renders current value", () => {
    render(<RangeSlider {...defaultProps} />);
    expect(screen.getByText("50")).toBeInTheDocument();
  });

  it("renders min and max labels", () => {
    render(<RangeSlider {...defaultProps} />);
    expect(screen.getByText("0")).toBeInTheDocument();
    expect(screen.getByText("100")).toBeInTheDocument();
  });

  it("calls onChange when slider is moved", () => {
    render(<RangeSlider {...defaultProps} />);
    const input = screen.getByRole("slider");

    fireEvent.change(input, { target: { value: "60" } });
    expect(defaultProps.onChange).toHaveBeenCalledWith(60);
  });

  it("calls onReset when reset button is clicked", () => {
    render(<RangeSlider {...defaultProps} value={60} />);
    const resetButton = screen.getByRole("button", { name: /reset/i });

    fireEvent.click(resetButton);
    expect(defaultProps.onReset).toHaveBeenCalled();
  });

  it("disables reset button when value equals defaultValue", () => {
    render(<RangeSlider {...defaultProps} value={50} />);
    const resetButton = screen.getByRole("button", { name: /reset/i });
    expect(resetButton).toBeDisabled();
  });

  it("enables reset button when value is different from defaultValue", () => {
    render(<RangeSlider {...defaultProps} value={75} />);
    const resetButton = screen.getByRole("button", { name: /reset/i });
    expect(resetButton).not.toBeDisabled();
  });
});
