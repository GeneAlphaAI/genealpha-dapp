// CommonDropdown.test.jsx
import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
  within,
} from "@testing-library/react";

import "@testing-library/jest-dom";
import CommonDropdown from "../../components/form/CommonDropdown";

afterEach(() => {
  jest.restoreAllMocks();
  cleanup();
});

describe("CommonDropdown", () => {
  test("renders trigger with default label when no value", () => {
    render(<CommonDropdown options={["a", "b"]} onSelect={() => {}} />);
    expect(screen.getByText("Select option")).toBeInTheDocument();
  });

  test("renders label from controlled value (uses getLabel/getValue)", () => {
    const options = [
      { label: "One", value: "1" },
      { label: "Two", value: "2" },
    ];
    render(
      <CommonDropdown
        options={options}
        value="2"
        onSelect={() => {}}
        getLabel={(o) => o.label}
        getValue={(o) => o.value}
      />
    );
    expect(screen.getByText("Two")).toBeInTheDocument();
  });

  test("opens dropdown on click and positions it (mocks getBoundingClientRect)", async () => {
    // ensure getBoundingClientRect returns predictable values used by effect
    const rect = { bottom: 100, left: 20, width: 300 };
    jest
      .spyOn(HTMLElement.prototype, "getBoundingClientRect")
      .mockImplementation(() => rect);

    // also ensure scrollY is predictable (usually 0 in jsdom)
    window.scrollY = 0;

    render(<CommonDropdown options={["a", "b"]} onSelect={() => {}} />);

    const trigger = screen.getByText("Select option");
    fireEvent.click(trigger);

    // wait for dropdown to appear
    await waitFor(() => {
      expect(screen.getByText("a")).toBeInTheDocument();
      expect(screen.getByText("b")).toBeInTheDocument();
    });

    // find the dropdown (it is the fixed element with inline style)
    const dropdown = document.querySelector("div.fixed[style]");
    expect(dropdown).toBeTruthy();

    // parse integer values from inline styles (robust to "px")
    const topPx = parseInt(dropdown.style.top, 10);
    const leftPx = parseInt(dropdown.style.left, 10);
    const widthPx = parseInt(dropdown.style.width, 10);

    // component sets top = rect.bottom + window.scrollY + 4
    expect(topPx).toBe(rect.bottom + window.scrollY + 4);
    expect(leftPx).toBe(rect.left + window.scrollX);
    expect(widthPx).toBe(rect.width);
  });

  test("shows 'Selected' indicator when option matches controlled value", async () => {
    const options = [
      { label: "Alpha", value: "a" },
      { label: "Beta", value: "b" },
    ];
    jest
      .spyOn(HTMLElement.prototype, "getBoundingClientRect")
      .mockImplementation(() => ({
        bottom: 200,
        left: 10,
        width: 150,
      }));

    render(
      <CommonDropdown
        options={options}
        value="b"
        onSelect={() => {}}
        getLabel={(o) => o.label}
        getValue={(o) => o.value}
      />
    );

    // open dropdown — click the trigger (it shows "Beta" already)
    fireEvent.click(screen.getByText("Beta"));
    await waitFor(() => screen.getByText("Alpha"));

    // find the dropdown container and scope queries within it
    const dropdown = document.querySelector("div.fixed[style]");
    expect(dropdown).toBeTruthy();
    const dd = within(dropdown);

    // now query for the Beta option inside the dropdown only
    const betaOption = dd.getByText("Beta");
    const betaRow = betaOption.closest("div");
    expect(betaRow).toBeTruthy();
    expect(betaRow).toHaveTextContent("Selected");
  });
  test("selecting an option calls onSelect with the option value and closes dropdown", async () => {
    const onSelect = jest.fn();
    const options = [
      { label: "Alpha", value: "a" },
      { label: "Beta", value: "b" },
    ];
    // Mock getBoundingClientRect to avoid errors when opening
    jest
      .spyOn(HTMLElement.prototype, "getBoundingClientRect")
      .mockImplementation(() => ({
        bottom: 200,
        left: 10,
        width: 150,
      }));

    render(
      <CommonDropdown
        options={options}
        value={null}
        onSelect={onSelect}
        getLabel={(o) => o.label}
        getValue={(o) => o.value}
      />
    );

    // open dropdown
    fireEvent.click(screen.getByText("Select option"));
    await waitFor(() => screen.getByText("Alpha"));

    // use mouseDown to match implementation
    const alpha = screen.getByText("Alpha");
    fireEvent.mouseDown(alpha);

    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenCalledWith("a");

    // after selection dropdown should be gone
    await waitFor(() => {
      expect(screen.queryByText("Alpha")).not.toBeInTheDocument();
    });
  });

  test("clicking outside (mousedown) closes the dropdown", async () => {
    jest
      .spyOn(HTMLElement.prototype, "getBoundingClientRect")
      .mockImplementation(() => ({
        bottom: 200,
        left: 10,
        width: 150,
      }));

    render(<CommonDropdown options={["one", "two"]} onSelect={() => {}} />);

    // open dropdown
    fireEvent.click(screen.getByText("Select option"));
    await waitFor(() => screen.getByText("one"));

    // simulate mousedown outside the component (on document body)
    fireEvent.mouseDown(document.body);

    // dropdown should close
    await waitFor(() => {
      expect(screen.queryByText("one")).not.toBeInTheDocument();
    });
  });

  test("renders 'No options' when options is empty", () => {
    render(<CommonDropdown options={[]} onSelect={() => {}} />);
    fireEvent.click(screen.getByText("Select option"));
    expect(screen.getByText("No options")).toBeInTheDocument();
  });
});
