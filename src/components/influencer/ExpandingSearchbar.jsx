import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setSearchInput,
  setSearchResults,
  toggleSelectInfluencer,
} from "../../store/slices/influencer";

const sampleData = [
  {
    name: "Income Shark",
    username: "incomeshark",
    isVerified: true,
    image: "/assets/sample/incomeshark.jpg",
  },
  {
    name: "Cheds Trading",
    username: "BigCheds",
    isVerified: true,
    image: "/assets/sample/bigcheds.jpg",
  },
  {
    name: "Crypto Tony",
    username: "CryptoTony__",
    isVerified: false,
    image: "/assets/sample/cryptotony.jpg",
  },
  {
    name: "il Capo of Crypto",
    username: "CryptoCapo_",
    isVerified: false,
    image: "/assets/sample/ilcapo.jpg",
  },
  {
    name: "Eliz",
    username: "eliz883",
    isVerified: true,
    image: "/assets/sample/eliz.jpg",
  },
];

export default function ExpandingSearchBar() {
  const dispatch = useDispatch();
  const { searchInput, searchResults, selectedInfluencers } = useSelector(
    (state) => state.influencer
  );
  const [focused, setFocused] = React.useState(false);

  const showResults = focused && searchInput;

  const handleInputChange = (e) => {
    const value = e.target.value;
    dispatch(setSearchInput(value));

    const results = sampleData.filter(
      (item) =>
        item.username.toLowerCase().includes(value.toLowerCase()) ||
        item.name.toLowerCase().includes(value.toLowerCase())
    );
    dispatch(setSearchResults(results));
  };

  return (
    <div className="flex flex-col items-center">
      <div
        className="w-full rounded-[5px] border-[0.5px] border-stroke-gray text-primary-text shadow-sm overflow-hidden transition-all duration-300 ease-in-out"
        style={{
          maxHeight: showResults
            ? `${Math.max(Math.min(searchResults.length, 3), 1) * 64 + 66}px`
            : "60px",
        }}
      >
        {/* Input */}
        <input
          type="text"
          value={searchInput}
          onChange={handleInputChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 150)}
          placeholder="Search by name or username"
          className="w-full px-4 py-3 focus:outline-none"
        />

        {/* Results */}
        {showResults && (
          <div
            className={`${searchResults.length > 3 ? "overflow-y-auto" : ""}`}
            style={{
              maxHeight: searchResults.length > 3 ? `${3 * 64}px` : "auto",
            }}
          >
            {searchResults.length > 0 ? (
              searchResults.map((item, index) => {
                const isSelected = selectedInfluencers.some(
                  (inf) => inf.username === item.username
                );
                return (
                  <div
                    key={index}
                    className={`px-4 py-3 flex items-center gap-2 hover:bg-white/10 ${
                      isSelected ? "pointer-events-none" : "cursor-pointer"
                    }`}
                    onMouseDown={() => dispatch(toggleSelectInfluencer(item))}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="size-[30px] rounded-full"
                    />
                    <div className="flex flex-col">
                      <span className="flex items-center gap-1 text-xs font-medium">
                        {item.name}
                        {item.isVerified && (
                          <img
                            src={"/assets/influencer/Verified.svg"}
                            alt="verified"
                            className="size-4 rounded-full"
                          />
                        )}
                      </span>
                      <span className="text-xxs text-low-opacity font-jetbrains-mono font-regular uppercase">
                        @{item.username}
                      </span>
                    </div>
                    {isSelected && (
                      <span className="ml-auto text-xxs text-medium-opacity">
                        Selected
                      </span>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="px-4 py-3 text-xs text-gray-500">
                No results found
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
