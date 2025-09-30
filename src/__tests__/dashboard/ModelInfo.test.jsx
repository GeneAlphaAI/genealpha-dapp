// __tests__/ModelInfo.test.jsx
import React from "react";
import { render, screen } from "@testing-library/react";
import ModelInfo from "../../components/dashboard/ModelInfo";

describe("ModelInfo Component", () => {
  test("renders title and value correctly", () => {
    render(<ModelInfo title="Predicted Price" value="$100" />);

    const title = screen.getByText(/Predicted Price/i);
    const value = screen.getByText("$100");

    expect(title).toBeInTheDocument();
    expect(value).toBeInTheDocument();
  });

  test("applies default valueClassName and infoClassName", () => {
    render(<ModelInfo title="Error" value="2.5%" />);

    const value = screen.getByText("2.5%");
    const container = value.closest("div");

    expect(value).toHaveClass("text-sm");
    expect(container).toHaveClass("items-start");
  });

  test("overrides class names when provided", () => {
    render(
      <ModelInfo
        title="MAE"
        value="1.2%"
        valueClassName="text-lg font-bold"
        infoClassName="items-end gap-2"
      />
    );

    const value = screen.getByText("1.2%");
    const container = value.closest("div");

    expect(value).toHaveClass("text-lg", "font-bold");
    expect(container).toHaveClass("items-end", "gap-2");
  });
});
