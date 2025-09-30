// src/__tests__/CustomButton.test.jsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CustomButton from "../../components/buttons/CustomButton";

describe("CustomButton", () => {
  it("renders with children", () => {
    render(<CustomButton>Click Me</CustomButton>);
    expect(screen.getByText("Click Me")).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const handleClick = jest.fn();
    render(<CustomButton onClick={handleClick}>Click Me</CustomButton>);
    const button = screen.getByRole("button", { name: /click me/i });
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("applies disabled state", () => {
    render(<CustomButton disabled>Click Me</CustomButton>);
    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toBeDisabled();
    expect(button).toHaveClass("cursor-not-allowed");
  });

  it("applies loading state and shows loader", () => {
    render(<CustomButton loading>Click Me</CustomButton>);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();

    // Check for loading dots
    const loadingDots = button.querySelectorAll("span");
    expect(loadingDots.length).toBe(3);
  });

  it("applies custom className and textClassName", () => {
    render(
      <CustomButton className="custom-btn" textClassName="custom-text">
        Click Me
      </CustomButton>
    );
    const button = screen.getByRole("button");
    expect(button).toHaveClass("custom-btn");
    const textDiv = button.querySelector("div");
    expect(textDiv).toHaveClass("custom-text");
  });

  it("respects type prop", () => {
    render(<CustomButton type="submit">Submit</CustomButton>);
    const button = screen.getByRole("button", { name: /submit/i });
    expect(button).toHaveAttribute("type", "submit");
  });
});
