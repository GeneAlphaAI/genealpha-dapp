import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AgentCard from "../../components/influencer/AgentCard";

// ✅ Mock ActionDropdown at the top level
jest.mock("../../utilities/ActionDropdown", () => {
  return ({ items }) => (
    <div>
      {items.map((item) => (
        <button key={item.label} onClick={item.action}>
          {item.label}
        </button>
      ))}
    </div>
  );
});

describe("AgentCard", () => {
  const mockOnClick = jest.fn();
  const mockToggleEditPopup = jest.fn();
  const mockToggleDeletePopup = jest.fn();

  const defaultProps = {
    onClick: mockOnClick,
    name: "Test Agent",
    sources: ["source1", "source2"],
    combinedPrediction: "Combined prediction text",
    profiles: [
      { profile_image_url: "profile1.png", name: "User1" },
      { profile_image_url: "profile2.png", name: "User2" },
    ],
    predictions: [
      {
        category: "stock",
        account_info: {
          profile_image_url: "acc1.png",
          name: "UserA",
          username: "usera",
          _id: "123",
        },
        summary: { reason: "Reason A" },
        text: "Prediction text A",
        tweet_id: "tweet123",
      },
      {
        category: "crypto",
        account_info: {
          profile_image_url: "acc2.png",
          name: "UserB",
          username: "userb",
          _id: "456",
        },
        summary: { reason: "Reason B" },
        text: "Prediction text B",
        tweet_id: "tweet456",
      },
    ],
    toggleEditPopup: mockToggleEditPopup,
    toggleDeletePopup: mockToggleDeletePopup,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders agent card with combined prediction and predictions list", () => {
    render(<AgentCard {...defaultProps} />);
    expect(screen.getByText("Test Agent")).toBeInTheDocument();
    expect(screen.getByText("2 sources")).toBeInTheDocument();
    expect(screen.getByText("Combined prediction text")).toBeInTheDocument();
    expect(screen.getByText("@usera")).toBeInTheDocument();
    expect(screen.getByText("@userb")).toBeInTheDocument();
  });

  it("renders empty state if no predictions", () => {
    render(<AgentCard {...defaultProps} predictions={[]} />);
    expect(
      screen.getByText("Your Influencers haven’t posted yet")
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Once they do, their predictions will appear/i)
    ).toBeInTheDocument();
  });

  it("calls onClick when card clicked and predictions exist", () => {
    render(<AgentCard {...defaultProps} />);
    fireEvent.click(screen.getByText("Test Agent").closest("div"));
    expect(mockOnClick).toHaveBeenCalled();
  });

  it("calls toggleEditPopup and toggleDeletePopup from dropdown actions", () => {
    render(<AgentCard {...defaultProps} />);
    fireEvent.click(screen.getByText("Update"));
    expect(mockToggleEditPopup).toHaveBeenCalledWith("Test Agent");

    fireEvent.click(screen.getByText("Delete"));
    expect(mockToggleDeletePopup).toHaveBeenCalledWith("Test Agent");
  });

  it("opens external link when prediction button clicked", () => {
    window.open = jest.fn();
    render(<AgentCard {...defaultProps} />);

    const tweetButton = screen.getAllByRole("button", {
      name: /Prediction text/i,
    })[0];
    fireEvent.click(tweetButton);

    expect(window.open).toHaveBeenCalledWith(
      "https://x.com/123/status/tweet123",
      "_blank"
    );
  });
});
