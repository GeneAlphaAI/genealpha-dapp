// src/__tests__/CommonInput.test.jsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CommonInput from "../../components/form/CommonInput";

describe("CommonInput", () => {
  const onChangeMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders input with placeholder", () => {
    render(
      <CommonInput value="" onChange={onChangeMock} placeholder="Enter text" />
    );

    const input = screen.getByPlaceholderText("Enter text");
    expect(input).toBeInTheDocument();
  });

  it("renders with initial value", () => {
    render(<CommonInput value="Hello" onChange={onChangeMock} />);
    const input = screen.getByDisplayValue("Hello");
    expect(input).toBeInTheDocument();
  });

  it("calls onChange when typing", () => {
    render(<CommonInput value="" onChange={onChangeMock} />);
    const input = screen.getByRole("textbox");

    fireEvent.change(input, { target: { value: "Test" } });
    expect(onChangeMock).toHaveBeenCalledWith("Test");
  });

  it("shows minLength error when value is too short", () => {
    render(<CommonInput value="Hi" onChange={onChangeMock} minLength={5} />);
    const input = screen.getByRole("textbox");

    // Simulate typing short value
    fireEvent.change(input, { target: { value: "Hi" } });

    expect(
      screen.getByText("Must be at least 5 characters")
    ).toBeInTheDocument();
  });

  it("shows maxLength error when value is too long", () => {
    render(
      <CommonInput value="HelloWorld" onChange={onChangeMock} maxLength={5} />
    );
    const input = screen.getByRole("textbox");

    fireEvent.change(input, { target: { value: "HelloWorld" } });

    expect(
      screen.getByText("Must be at most 5 characters")
    ).toBeInTheDocument();
  });

  it("shows range error when both minLength and maxLength are set", () => {
    render(
      <CommonInput
        value="Hi"
        onChange={onChangeMock}
        minLength={3}
        maxLength={5}
      />
    );
    const input = screen.getByRole("textbox");

    fireEvent.change(input, { target: { value: "Hi" } });

    expect(
      screen.getByText("Must be between 3 and 5 characters")
    ).toBeInTheDocument();
  });

  it("does not show error when value is within limits", () => {
    render(
      <CommonInput
        value="Test"
        onChange={onChangeMock}
        minLength={3}
        maxLength={5}
      />
    );
    const input = screen.getByRole("textbox");

    fireEvent.change(input, { target: { value: "Test" } });

    expect(screen.queryByText(/Must be/)).not.toBeInTheDocument();
  });
});
