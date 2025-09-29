// FrameSelector.test.jsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import FrameSelector from "../../components/dashboard/FrameSelector";

describe("FrameSelector", () => {
  const frames = {
    "Frame A": {},
    "Frame B": {},
    "Frame C": {},
  };

  test("renders all frame buttons", () => {
    render(
      <FrameSelector frames={frames} selectedFrame={null} onChange={() => {}} />
    );

    Object.keys(frames).forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  test("applies selected class to selected frame", () => {
    render(
      <FrameSelector
        frames={frames}
        selectedFrame="Frame B"
        onChange={() => {}}
      />
    );

    const frameB = screen.getByText("Frame B");
    const frameA = screen.getByText("Frame A");

    expect(frameB).toHaveClass("text-dull-white"); // selected
    expect(frameA).toHaveClass("text-dull-gray"); // not selected
  });

  test("calls onChange with the correct label when a frame is clicked", () => {
    const onChangeMock = jest.fn();
    render(
      <FrameSelector
        frames={frames}
        selectedFrame="Frame A"
        onChange={onChangeMock}
      />
    );

    const frameC = screen.getByText("Frame C");
    fireEvent.click(frameC);

    expect(onChangeMock).toHaveBeenCalledTimes(1);
    expect(onChangeMock).toHaveBeenCalledWith("Frame C");
  });

  test("updates selected frame visually when prop changes", () => {
    const { rerender } = render(
      <FrameSelector
        frames={frames}
        selectedFrame="Frame A"
        onChange={() => {}}
      />
    );

    expect(screen.getByText("Frame A")).toHaveClass("text-dull-white");
    expect(screen.getByText("Frame B")).toHaveClass("text-dull-gray");

    // Change selectedFrame prop
    rerender(
      <FrameSelector
        frames={frames}
        selectedFrame="Frame B"
        onChange={() => {}}
      />
    );

    expect(screen.getByText("Frame A")).toHaveClass("text-dull-gray");
    expect(screen.getByText("Frame B")).toHaveClass("text-dull-white");
  });

  test("renders heading text", () => {
    render(
      <FrameSelector frames={frames} selectedFrame={null} onChange={() => {}} />
    );

    expect(screen.getByText("Frame")).toBeInTheDocument();
  });
});
