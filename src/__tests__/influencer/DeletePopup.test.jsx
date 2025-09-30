import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import DeletePopup from "../../components/influencer/DeletePopup";
import { DeleteAgent } from "../../services/apiFunctions";
import showToast from "../../utilities/showToast";
import { useAccount } from "wagmi";
import { useDispatch } from "react-redux";

// Mock dependencies
jest.mock("../../services/apiFunctions", () => ({
  DeleteAgent: jest.fn(),
}));

jest.mock("../../utilities/showToast", () => jest.fn());

jest.mock("wagmi", () => ({
  useAccount: jest.fn(),
}));

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
}));

describe("DeletePopup", () => {
  const mockOnClose = jest.fn();
  const mockDispatch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useAccount.mockReturnValue({ address: "0x123" });
    useDispatch.mockReturnValue(mockDispatch);
  });

  it("renders correctly with Cancel and Delete buttons", () => {
    render(<DeletePopup onClose={mockOnClose} agentName="Test Agent" />);

    expect(screen.getByText("Delete Agent")).toBeInTheDocument();
    expect(
      screen.getByText(/Are you sure you want to delete/i)
    ).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
    expect(screen.getByText("Delete")).toBeInTheDocument();
  });

  it("calls onClose when Cancel button is clicked", () => {
    render(<DeletePopup onClose={mockOnClose} agentName="Test Agent" />);
    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);
    expect(mockOnClose).toHaveBeenCalled();
  });

  it("calls DeleteAgent and handles success response", async () => {
    DeleteAgent.mockResolvedValue({ status: 200 });

    render(<DeletePopup onClose={mockOnClose} agentName="Test Agent" />);
    const deleteButton = screen.getByText("Delete");
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(DeleteAgent).toHaveBeenCalledWith("0x123", "Test Agent");
      expect(showToast).toHaveBeenCalledWith(
        "success",
        "Agent Deleted Successfully!",
        "/assets/Toast/Success.svg"
      );
      expect(mockDispatch).toHaveBeenCalledWith({
        type: "influencer/setDataUpdated",
        payload: true,
      });
      expect(mockOnClose).toHaveBeenCalled();
    });
  });

  it("calls DeleteAgent and handles already deleted response", async () => {
    DeleteAgent.mockResolvedValue({ status: 400 });

    render(<DeletePopup onClose={mockOnClose} agentName="Test Agent" />);
    const deleteButton = screen.getByText("Delete");
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(DeleteAgent).toHaveBeenCalledWith("0x123", "Test Agent");
      expect(showToast).toHaveBeenCalledWith(
        "error",
        "Agent Already Deleted!",
        "/assets/Toast/Error.svg"
      );
      expect(mockOnClose).toHaveBeenCalled();
    });
  });

  it("sets loading state while deleting", async () => {
    let resolvePromise;
    DeleteAgent.mockReturnValue(
      new Promise((resolve) => {
        resolvePromise = resolve;
      })
    );

    render(<DeletePopup onClose={mockOnClose} agentName="Test Agent" />);

    // Query the actual button element
    const deleteButton = screen.getByRole("button", { name: /delete/i });

    // Click triggers loading
    fireEvent.click(deleteButton);
    expect(deleteButton).toBeDisabled(); // now works, since it's the <button>

    // Resolve the promise
    await act(async () => {
      resolvePromise({ status: 200 });
    });

    expect(deleteButton).not.toBeDisabled();
  });
});
