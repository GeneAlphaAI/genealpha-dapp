// src/__tests__/PrimaryButton.test.jsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import PrimaryButton from "../../components/buttons/PrimaryButton";

describe("PrimaryButton", () => {
  it("renders children text", () => {
    render(<PrimaryButton>Click Me</PrimaryButton>);
    expect(
      screen.getByRole("button", { name: /click me/i })
    ).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const handleClick = jest.fn();
    render(<PrimaryButton onClick={handleClick}>Click Me</PrimaryButton>);
    fireEvent.click(screen.getByRole("button", { name: /click me/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("does not call onClick when disabled", () => {
    const handleClick = jest.fn();
    render(
      <PrimaryButton disabled onClick={handleClick}>
        Disabled
      </PrimaryButton>
    );
    const button = screen.getByRole("button", { name: /disabled/i });
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
    expect(button).toBeDisabled();
  });

  it("shows loading spinner when loading is true", () => {
    render(<PrimaryButton loading>Loading</PrimaryButton>);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    // The text should not be visible
    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    // Spinner dots should render
    expect(button.querySelectorAll("span")).toHaveLength(3);
  });

  it("applies extra className props", () => {
    render(<PrimaryButton className="bg-red-500">Styled</PrimaryButton>);
    const button = screen.getByRole("button", { name: /styled/i });
    expect(button).toHaveClass("bg-red-500");
  });
});
