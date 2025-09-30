import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ModelStatus from "../../components/header/ModelStatus";

describe("ModelStatus", () => {
  test("renders status image with correct src and alt", () => {
    render(<ModelStatus />);
    const img = screen.getByAltText("Pause");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "/assets/dashboard/GreenStatus.svg");
  });

  test("renders status text", () => {
    render(<ModelStatus />);
    const text = screen.getByText("All Models Live");
    expect(text).toBeInTheDocument();
  });

  test("renders container with flex class", () => {
    render(<ModelStatus />);
    const container = screen.getByText("All Models Live").closest("div");
    expect(container).toHaveClass("flex items-center");
  });
});
