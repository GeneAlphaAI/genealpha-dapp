// HistoricalPredictionCard.test.jsx
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import HistoricalPredictionCard from "../../components/dashboard/HistoricalPredictionCard";

// Mock PredictionTable to keep tests focused on the parent
jest.mock("../../components/dashboard/PredictionTable", () => () => (
  <div data-testid="prediction-table" />
));

// Mock Dropdown so we can inspect the props it was called with.
// The mock renders a JSON blob of the options and other relevant props so tests can query them.
jest.mock("../../utilities/Dropdown", () => (props) => {
  return (
    <div data-testid="mock-dropdown">
      <div data-testid="mock-dropdown-label">{props.options?.[0]?.label}</div>
      <div data-testid="mock-dropdown-props">
        {JSON.stringify({
          position: props.position,
          icon: props.icon,
          triggerClassName: props.triggerClassName,
          labelClassName: props.labelClassName,
          contentClassName: props.contentClassName,
          optionsLength: props.options?.length ?? 0,
        })}
      </div>
    </div>
  );
});

describe("HistoricalPredictionCard", () => {
  test("renders heading", () => {
    render(<HistoricalPredictionCard />);
    expect(screen.getByText("Historical Predictions")).toBeInTheDocument();
  });

  test("renders description text", () => {
    render(<HistoricalPredictionCard />);
    expect(
      screen.getByText(
        /Recorded predictions with each error is determined by the difference/i
      )
    ).toBeInTheDocument();
  });

  test("renders Dropdown and passes options/props", () => {
    render(<HistoricalPredictionCard />);

    const dropdown = screen.getByTestId("mock-dropdown");
    expect(dropdown).toBeInTheDocument();

    // The mock renders the first option's label; assert it matches expected first option
    const firstLabel = screen.getByTestId("mock-dropdown-label");
    expect(firstLabel).toHaveTextContent("1 HOUR");

    // The mock also renders serialized props; parse and assert values
    const propsJson = screen.getByTestId("mock-dropdown-props").textContent;
    const parsed = JSON.parse(propsJson);
    expect(parsed.position).toBe("right");
    expect(parsed.icon).toBe("/assets/dashboard/DownArrow.svg");
    // ensure the options length is 5 (as defined in the component)
    expect(parsed.optionsLength).toBe(5);
    // spot check that contentClassName includes the "min-w-max" class we expect
    expect(parsed.contentClassName).toContain("min-w-max");
  });

  test("renders PredictionTable component", () => {
    render(<HistoricalPredictionCard />);
    expect(screen.getByTestId("prediction-table")).toBeInTheDocument();
  });
});
