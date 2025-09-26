import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import influencerReducer, {
  setSelectedCategories,
} from "../../store/slices/influencer";
import CategorySelector from "../../components/influencer/CategorySelector";

function renderWithRedux(
  ui,
  {
    initialState,
    store = configureStore({
      reducer: { influencer: influencerReducer },
      preloadedState: initialState,
    }),
  } = {}
) {
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store,
  };
}

describe("CategorySelector", () => {
  const categories = ["Stock", "Crypto", "NFT"];

  it("renders all categories", () => {
    renderWithRedux(<CategorySelector categories={categories} />);
    categories.forEach((cat) => {
      expect(screen.getByText(cat)).toBeInTheDocument();
    });
  });

  it("initializes with defaultCategory if none selected", () => {
    const defaultCategory = "Crypto";
    const { store } = renderWithRedux(
      <CategorySelector
        categories={categories}
        defaultCategory={defaultCategory}
      />
    );

    // Check Redux state
    expect(store.getState().influencer.selectedCategories).toEqual([
      defaultCategory,
    ]);

    // Check button styling
    const cryptoButton = screen.getByText("Crypto");
    expect(cryptoButton).toHaveClass("bg-primary-text");
  });

  it("initializes with first category if no defaultCategory provided", () => {
    const { store } = renderWithRedux(
      <CategorySelector categories={categories} />
    );
    expect(store.getState().influencer.selectedCategories).toEqual([
      categories[0],
    ]);
  });

  it("toggles category selection when clicked", () => {
    const { store } = renderWithRedux(
      <CategorySelector categories={categories} />
    );

    const stockButton = screen.getByText("Stock");
    const cryptoButton = screen.getByText("Crypto");

    // Initially only Stock selected
    expect(stockButton).toHaveClass("bg-primary-text");
    expect(cryptoButton).toHaveClass("bg-transparent");

    // Click Crypto to select it
    fireEvent.click(cryptoButton);
    expect(store.getState().influencer.selectedCategories).toEqual([
      "Stock",
      "Crypto",
    ]);
    expect(cryptoButton).toHaveClass("bg-primary-text");

    // Click Stock to deselect it
    fireEvent.click(stockButton);
    expect(store.getState().influencer.selectedCategories).toEqual(["Crypto"]);
    expect(stockButton).toHaveClass("bg-transparent");
  });

  it("prevents deselecting the last remaining category", () => {
    const { store } = renderWithRedux(
      <CategorySelector categories={categories} />
    );
    const stockButton = screen.getByText("Stock");

    // Initially only Stock selected
    expect(store.getState().influencer.selectedCategories).toEqual(["Stock"]);

    // Click Stock to deselect - should not remove
    fireEvent.click(stockButton);
    expect(store.getState().influencer.selectedCategories).toEqual(["Stock"]);
  });
});
