// Balance.test.jsx
import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";

// Mock wagmi's useAccount
jest.mock("wagmi", () => ({
  useAccount: jest.fn(),
}));

// Mock your useTokenBalance hook
jest.mock("../../utilities/useTokenBalance", () => jest.fn());

import { useAccount } from "wagmi";
import useTokenBalance from "../../utilities/useTokenBalance";
import Balance from "../../components/header/Balance";

afterEach(() => {
  jest.resetAllMocks();
  cleanup();
});

describe("Balance component", () => {
  test("renders nothing when not connected", () => {
    // simulate not connected
    useAccount.mockReturnValue({ isConnected: false });

    // Even if hook returns a balance, component should early-return
    useTokenBalance.mockReturnValue({ balance: "2500000000000000000" });

    const { container } = render(<Balance />);
    // Should render nothing (component returns undefined) — container empty
    expect(container).toBeEmptyDOMElement();
    // Also make sure GA text is not present
    expect(screen.queryByText("GA")).not.toBeInTheDocument();
  });

  test("renders formatted balance when connected", () => {
    useAccount.mockReturnValue({ isConnected: true });
    // 2.5 GA (2.5 * 1e18)
    useTokenBalance.mockReturnValue({ balance: "2500000000000000000" });

    render(<Balance />);

    // The number is computed as Number((Number(balance)/1e18).toFixed(3))
    // 2.5 => shown as "2.5"
    expect(screen.getByText("2.5")).toBeInTheDocument();
    expect(screen.getByText("GA")).toBeInTheDocument();
  });

  test("shows 0 when connected but balance is missing/invalid", () => {
    useAccount.mockReturnValue({ isConnected: true });
    // simulate hook returning undefined
    useTokenBalance.mockReturnValue({ balance: undefined });

    render(<Balance />);

    // should render 0
    expect(screen.getByText("0")).toBeInTheDocument();
    expect(screen.getByText("GA")).toBeInTheDocument();
  });

  test("rounds/truncates to 3 decimal places", () => {
    useAccount.mockReturnValue({ isConnected: true });
    // 1.234567... -> toFixed(3) => "1.235" -> Number -> 1.235
    useTokenBalance.mockReturnValue({ balance: "1234567000000000000" }); // 1.234567
    render(<Balance />);
    expect(screen.getByText("1.235")).toBeInTheDocument();
  });
});
