// src/__tests__/SecondaryButton.test.jsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SecondaryButton from "../../components/buttons/SecondaryButton";

describe("SecondaryButton", () => {
  it("renders children text", () => {
    render(<SecondaryButton>Cancel</SecondaryButton>);
    expect(screen.getByRole("button", { name: /cancel/i })).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const handleClick = jest.fn();
    render(<SecondaryButton onClick={handleClick}>Click Me</SecondaryButton>);
    fireEvent.click(screen.getByRole("button", { name: /click me/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("does not call onClick when disabled", () => {
    const handleClick = jest.fn();
    render(
      <SecondaryButton disabled onClick={handleClick}>
        Disabled
      </SecondaryButton>
    );
    const button = screen.getByRole("button", { name: /disabled/i });
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
    expect(button).toBeDisabled();
  });

  it("shows loading spinner when loading is true", () => {
    render(<SecondaryButton loading>Loading</SecondaryButton>);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    // Text should not be visible when loading
    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    // Spinner dots should render
    expect(button.querySelectorAll("span")).toHaveLength(3);
  });

  it("applies extra className props", () => {
    render(<SecondaryButton className="bg-blue-500">Styled</SecondaryButton>);
    const button = screen.getByRole("button", { name: /styled/i });
    expect(button).toHaveClass("bg-blue-500");
  });
});
