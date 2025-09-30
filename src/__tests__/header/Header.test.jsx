import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import Header from "../../components/header/Header";

// Mock child components
jest.mock("../../components/header/Refresh", () => () => (
  <div data-testid="refresh" />
));
jest.mock("../../components/header/ModelStatus", () => () => (
  <div data-testid="model-status" />
));
jest.mock("../../components/header/Balance", () => () => (
  <div data-testid="balance" />
));
jest.mock("../../components/connect/ConnectButton", () => () => (
  <div data-testid="connect-btn" />
));
jest.mock("../../utilities/Dropdown", () => (props) => (
  <div data-testid="dropdown">{props.holderText || "Dropdown"}</div>
));
jest.mock("../../utilities/ProfileDropdown", () => () => (
  <div data-testid="profile-dropdown" />
));

describe("Header Component", () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        token: () => ({
          options: ["Token1", "Token2"],
          selectedToken: "Token1",
        }),
      },
    });
  });

  test("renders logo and title", () => {
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    expect(screen.getByAltText("Hive Logo")).toBeInTheDocument();
    expect(screen.getByText("Hive")).toBeInTheDocument();
  });

  test("renders dropdown with holder text", () => {
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );
    expect(screen.getByTestId("dropdown")).toHaveTextContent(
      /Show Predictions:/
    );
  });

  test("renders child components in the right section", () => {
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );
    expect(screen.getByTestId("refresh")).toBeInTheDocument();
    expect(screen.getByTestId("model-status")).toBeInTheDocument();
    expect(screen.getByTestId("balance")).toBeInTheDocument();

    const connectButtons = screen.getAllByTestId("connect-btn");
    expect(connectButtons.length).toBe(2);
    connectButtons.forEach((btn) => expect(btn).toBeInTheDocument());
  });

  test("hamburger button triggers correct callback", () => {
    const onHamburgerClick = jest.fn();
    const onCloseDrawer = jest.fn();

    const { rerender } = render(
      <Provider store={store}>
        <Header
          onHamburgerClick={onHamburgerClick}
          isDrawerOpen={false}
          onCloseDrawer={onCloseDrawer}
        />
      </Provider>
    );

    const button = screen.getByRole("button", { name: /Open menu/i });
    fireEvent.click(button);
    expect(onHamburgerClick).toHaveBeenCalledTimes(1);

    // Rerender with drawer open
    rerender(
      <Provider store={store}>
        <Header
          onHamburgerClick={onHamburgerClick}
          isDrawerOpen={true}
          onCloseDrawer={onCloseDrawer}
        />
      </Provider>
    );
    const closeButton = screen.getByRole("button", { name: /Close menu/i });
    fireEvent.click(closeButton);
    expect(onCloseDrawer).toHaveBeenCalledTimes(1);
  });
});
