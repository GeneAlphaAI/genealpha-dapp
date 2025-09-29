import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Refresh from "../../components/header/Refresh"; // adjust path

describe("Refresh Component", () => {
  test("renders SVG circle with animation", () => {
    render(<Refresh duration={10} />);
    const circle = document.querySelector("circle");
    expect(circle).toBeInTheDocument();
    expect(circle).toHaveAttribute("stroke", "#FACC15");
    expect(circle).toHaveStyle("animation: progress 10s linear infinite");
  });

  test("renders pause icon", () => {
    render(<Refresh />);
    const pauseIcon = screen.getByAltText("Pause");
    expect(pauseIcon).toBeInTheDocument();
    expect(pauseIcon).toHaveAttribute("src", "/assets/dashboard/Pause.svg");
  });

  test("renders both text labels", () => {
    render(<Refresh />);
    expect(screen.getByText("Pause Auto-Refresh")).toBeInTheDocument();
    expect(screen.getByText("Pause Refresh")).toBeInTheDocument();
  });

  test("calculates circumference correctly", () => {
    const { container } = render(<Refresh />);
    const size = 24;
    const stroke = 1;
    const radius = (size - stroke) / 2;
    const circumference = 2 * Math.PI * radius;

    const circle = container.querySelector("circle");
    expect(circle).toHaveAttribute("stroke-dasharray", `${circumference}`);
    expect(circle).toHaveAttribute("stroke-dashoffset", `${circumference}`);
  });
});
