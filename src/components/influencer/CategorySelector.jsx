import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedCategories } from "../../store/slices/influencer";

export default function CategorySelector({ categories }) {
  const dispatch = useDispatch();
  const selectedCategories = useSelector(
    (state) => state.influencer.selectedCategories
  );

  const toggleCategory = (category) => {
    const currentValue = !!selectedCategories[category];
    dispatch(setSelectedCategories([{ [category]: !currentValue }]));
  };

  return (
    <div className="flex gap-2 flex-wrap">
      {categories.map((cat) => {
        const isSelected = !!selectedCategories[cat];
        return (
          <button
            key={cat}
            onClick={() => toggleCategory(cat)}
            className={`px-3 py-1 rounded-full cursor-pointer border text-xs font-regular transition-colors
              ${
                isSelected
                  ? "bg-primary-text text-primary border-white"
                  : "bg-transparent text-primary-text border-stroke-gray hover:border-white/60"
              }
            `}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}
