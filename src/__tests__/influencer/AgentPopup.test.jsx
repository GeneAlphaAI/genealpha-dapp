import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AgentPopup from "../../components/influencer/AgentPopup";

describe("AgentPopup", () => {
  const mockOnClose = jest.fn();

  const agent = {
    agent: "Test Agent",
    accounts: [
      {
        account_info: {
          profile_image_url: "acc1.png",
          name: "UserA",
          username: "usera",
          _id: "123",
        },
        isVerified: true,
      },
      {
        account_info: {
          profile_image_url: "acc2.png",
          name: "UserB",
          username: "userb",
          _id: "456",
        },
        isVerified: false,
      },
    ],
    categories: ["stock", "crypto"],
    combinedPrediction: {
      profiles: [
        { image: "profile1.png", name: "User1" },
        { image: "profile2.png", name: "User2" },
      ],
    },
    predictions: [
      {
        category: "stock",
        account_info: {
          profile_image_url: "acc1.png",
          name: "UserA",
          username: "usera",
          _id: "123",
        },
        summary: {
          reason: "Reason A",
          token: "ABC",
          predicted_price: 100,
          current_price: 110,
        },
        text: "Prediction text A",
        tweet_id: "tweet123",
        created_at: "2025-09-26T10:00:00Z",
      },
      {
        category: "crypto",
        account_info: {
          profile_image_url: "acc2.png",
          name: "UserB",
          username: "userb",
          _id: "456",
        },
        summary: {
          reason: "Reason B",
          token: "XYZ",
          predicted_price: 50,
          current_price: 55,
        },
        text: "Prediction text B",
        tweet_id: "tweet456",
        created_at: "2025-09-25T10:00:00Z",
      },
    ],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders agent info, sources, categories, and combined prediction", () => {
    render(<AgentPopup agent={agent} onClose={mockOnClose} />);

    expect(screen.getByText("Test Agent")).toBeInTheDocument();
    expect(
      screen.getByText(`${agent.accounts.length} sources`)
    ).toBeInTheDocument();
    expect(screen.getByText("Combined Prediction")).toBeInTheDocument();

    // Scope to the "Categories" section
    const categoriesContainer = screen
      .getByText("Categories")
      .parentElement.querySelector("div");
    agent.categories.forEach((cat) => {
      expect(
        Array.from(categoriesContainer.children).some(
          (el) => el.textContent === cat
        )
      ).toBe(true);
    });
  });

  it("renders all predictions in table", () => {
    render(<AgentPopup agent={agent} onClose={mockOnClose} />);

    agent.predictions.forEach((pred) => {
      expect(screen.getByText(pred.summary.reason)).toBeInTheDocument();
      expect(screen.getByText(pred.text)).toBeInTheDocument();
      expect(screen.getByText(pred.summary.token)).toBeInTheDocument();
    });
  });

  it("filters predictions when influencer tab is clicked", () => {
    render(<AgentPopup agent={agent} onClose={mockOnClose} />);

    // Initially all predictions
    expect(screen.getByText("Reason A")).toBeInTheDocument();
    expect(screen.getByText("Reason B")).toBeInTheDocument();

    // Click UserA tab (scope to button)
    const userATab = screen
      .getAllByText("@usera")
      .find((el) => el.closest("button"));
    fireEvent.click(userATab);

    // Predictions table should update
    expect(screen.getByText("Reason A")).toBeInTheDocument();
    expect(screen.queryByText("Reason B")).not.toBeInTheDocument();
  });

  it("calls onClose when backdrop is clicked", () => {
    render(<AgentPopup agent={agent} onClose={mockOnClose} />);

    const backdrop = screen.getByTestId("agent-popup-backdrop"); // Add this in your component
    fireEvent.click(backdrop);

    expect(mockOnClose).toHaveBeenCalled();
  });

  it("calls onClose when CloseButton is clicked", () => {
    render(<AgentPopup agent={agent} onClose={mockOnClose} />);
    const closeButton = screen.getByRole("button", { name: /close/i });
    fireEvent.click(closeButton);
    expect(mockOnClose).toHaveBeenCalled();
  });

  it("opens external link when prediction button clicked", () => {
    window.open = jest.fn();
    render(<AgentPopup agent={agent} onClose={mockOnClose} />);

    const predButton = screen.getByText("Prediction text A").closest("button");
    fireEvent.click(predButton);

    expect(window.open).toHaveBeenCalledWith(
      "https://x.com/123/status/tweet123",
      "_blank"
    );
  });
});
