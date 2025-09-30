// src/__tests__/CommonSelector.test.jsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CommonSelector from "../../components/form/CommonSelector";

describe("CommonSelector", () => {
  const options = [
    { label: "Option A", value: "a" },
    { label: "Option B", value: "b" },
    { label: "Option C", value: "c" },
  ];

  it("renders label and description", () => {
    render(
      <CommonSelector
        label="Select Option"
        description="Choose wisely"
        options={options}
        selected={[]}
        onChange={jest.fn()}
      />
    );

    expect(screen.getByText("Select Option")).toBeInTheDocument();
    expect(screen.getByText("Choose wisely")).toBeInTheDocument();
  });

  it("renders all options", () => {
    render(
      <CommonSelector options={options} selected={[]} onChange={jest.fn()} />
    );

    options.forEach((opt) => {
      expect(screen.getByText(opt.label)).toBeInTheDocument();
    });
  });

  it("selects defaultValue on mount for single selection", () => {
    const onChangeMock = jest.fn();

    render(
      <CommonSelector
        options={options}
        selected={[]}
        defaultValue="b"
        onChange={onChangeMock}
      />
    );

    expect(onChangeMock).toHaveBeenCalledWith(["b"]);
  });

  it("selects first option if defaultValue not provided", () => {
    const onChangeMock = jest.fn();

    render(
      <CommonSelector options={options} selected={[]} onChange={onChangeMock} />
    );

    expect(onChangeMock).toHaveBeenCalledWith(["a"]);
  });

  it("toggles selection on click for single select", () => {
    const onChangeMock = jest.fn();
    render(
      <CommonSelector
        options={options}
        selected={["a"]}
        onChange={onChangeMock}
      />
    );

    const optionB = screen.getByText("Option B");
    fireEvent.click(optionB);

    expect(onChangeMock).toHaveBeenCalledWith(["b"]);
  });

  it("toggles selection on click for multiple select", () => {
    const options = ["a", "b"];
    let selected = ["a"];
    const onChangeMock = jest.fn((newSelected) => {
      selected = newSelected; // update mock state
      rerender(
        <CommonSelector
          options={options}
          selected={selected}
          multiple
          onChange={onChangeMock}
        />
      );
    });

    const { rerender } = render(
      <CommonSelector
        options={options}
        selected={selected}
        multiple
        onChange={onChangeMock}
      />
    );

    const optionB = screen.getByText("b");
    fireEvent.click(optionB);
    expect(onChangeMock).toHaveBeenLastCalledWith(["a", "b"]);

    fireEvent.click(optionB);
    expect(onChangeMock).toHaveBeenLastCalledWith(["a"]);
  });

  it("prevents deselecting required option", () => {
    const onChangeMock = jest.fn();
    render(
      <CommonSelector
        options={options}
        selected={["a"]}
        multiple
        required={["a"]}
        onChange={onChangeMock}
      />
    );

    const optionA = screen.getByText("Option A (required)");
    expect(optionA).toBeDisabled();
  });

  it("applies selected styles correctly", () => {
    render(
      <CommonSelector options={options} selected={["b"]} onChange={jest.fn()} />
    );

    const optionB = screen.getByText("Option B");
    expect(optionB).toHaveClass("bg-primary-text");
  });
});
