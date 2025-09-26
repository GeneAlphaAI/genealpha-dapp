// src/__tests__/CloseButton.test.jsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CloseButton from "../../components/buttons/CloseButton";

describe("CloseButton", () => {
  it("renders with default sm size", () => {
    render(<CloseButton />);
    const button = screen.getByRole("button", { name: /close/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("w-6 h-6 p-1");
  });

  it("renders with md size", () => {
    render(<CloseButton size="md" />);
    const button = screen.getByRole("button", { name: /close/i });
    expect(button).toHaveClass("w-8 h-8 p-2");
  });

  it("renders with lg size", () => {
    render(<CloseButton size="lg" />);
    const button = screen.getByRole("button", { name: /close/i });
    expect(button).toHaveClass("w-10 h-10 p-2.5");
  });

  it("calls onClick when clicked", () => {
    const handleClick = jest.fn();
    render(<CloseButton onClick={handleClick} />);
    fireEvent.click(screen.getByRole("button", { name: /close/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("renders the close icon image", () => {
    render(<CloseButton />);
    const img = screen.getByRole("img", { name: /back/i });
    expect(img).toHaveAttribute("src", "/assets/dashboard/Close.svg");
    expect(img).toHaveClass("w-[10px]");
  });
});
