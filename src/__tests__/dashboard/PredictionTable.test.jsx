// PredictionTable.test.jsx
import React from "react";
import { render, screen, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import PredictionTable from "../../components/dashboard/PredictionTable";

describe("PredictionTable", () => {
  const RealDate = Date;

  beforeAll(() => {
    // Freeze Date to a known value so formatTime is deterministic.
    // Using 2025-01-01 13:05 local (13:05 => 1:05 PM)
    const fixed = new RealDate("2025-01-01T13:05:00.000Z");
    // Create a Date class wrapper that returns `fixed` when constructed without args
    // but delegates to the real Date when arguments are provided.
    // Also override now() to the fixed timestamp.
    // NOTE: this approach is robust across environments.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // @ts-ignore
    global.Date = class extends RealDate {
      constructor(...args) {
        if (args.length === 0) {
          super(fixed);
          return new RealDate(fixed);
        }
        return new RealDate(...args);
      }
      static now() {
        return fixed.getTime();
      }
    };
  });

  afterAll(() => {
    // Restore original Date
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // @ts-ignore
    global.Date = RealDate;
  });

  test("renders table with headers", () => {
    render(<PredictionTable />);
    // headers
    expect(screen.getByText("Date")).toBeInTheDocument();
    expect(screen.getByText("Time")).toBeInTheDocument();
    expect(screen.getByText("Predictions")).toBeInTheDocument();
    expect(screen.getByText("Actual")).toBeInTheDocument();
    expect(screen.getByText("Error")).toBeInTheDocument();

    // table exists
    const table = screen.getByRole("table");
    expect(table).toBeInTheDocument();
  });

  test("renders 8 rows and each row contains the same formatted time", () => {
    render(<PredictionTable />);

    const tbody = screen.getByRole("table").querySelector("tbody");
    const rows = within(tbody).getAllByRole("row");
    expect(rows.length).toBe(8);

    // grab expected time string from the first cell
    const firstRowCells = within(rows[0]).getAllByRole("cell");
    const expectedTime = firstRowCells[0].textContent;

    rows.forEach((row) => {
      const cells = within(row).getAllByRole("cell");
      cells.forEach((cell) => {
        expect(cell).toHaveTextContent(expectedTime);
      });
    });
  });
});
