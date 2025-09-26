// src/__tests__/LinkButton.test.jsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import LinkButton from "../../components/buttons/LinkButton";

describe("LinkButton", () => {
  it("renders children correctly", () => {
    render(<LinkButton>Click Me</LinkButton>);
    expect(screen.getByText("Click Me")).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const handleClick = jest.fn();
    render(<LinkButton onClick={handleClick}>Click Me</LinkButton>);
    const button = screen.getByRole("button", { name: /click me/i });
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("applies disabled state", () => {
    render(<LinkButton disabled>Click Me</LinkButton>);
    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toBeDisabled();
    expect(button).toHaveClass("cursor-not-allowed");
  });

  it("applies loading state", () => {
    render(<LinkButton loading>Click Me</LinkButton>);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();

    const textDiv = button.querySelector("div");
    expect(textDiv).toHaveClass("opacity-70");
    expect(textDiv.textContent).toBe("Click Me");
  });

  it("applies custom className and textClassName", () => {
    render(
      <LinkButton className="custom-btn" textClassName="custom-text">
        Click Me
      </LinkButton>
    );
    const button = screen.getByRole("button");
    expect(button).toHaveClass("custom-btn");
    const textDiv = button.querySelector("div");
    expect(textDiv).toHaveClass("custom-text");
  });

  it("respects type prop", () => {
    render(<LinkButton type="submit">Submit</LinkButton>);
    const button = screen.getByRole("button", { name: /submit/i });
    expect(button).toHaveAttribute("type", "submit");
  });
});
