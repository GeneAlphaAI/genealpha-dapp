import React, { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setSearchInput,
  setSearchResults,
  toggleSelectInfluencer,
} from "../../store/slices/influencer";
import { SearchInfluencer } from "../../services/apiFunctions";
import SecondaryButton from "../buttons/SecondaryButton";

export default function ExpandingSearchBar() {
  const dispatch = useDispatch();
  const { searchInput, searchResults, selectedInfluencers } = useSelector(
    (state) => state.influencer
  );
  const [focused, setFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({});

  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  const MIN_USERNAME_LENGTH = 1;
  const MAX_USERNAME_LENGTH = 15;

  // Show results when focused OR when we have search results after a search
  const showResults = (focused || hasSearched) && hasSearched;
  const isSearchDisabled =
    loading ||
    !searchInput.trim() ||
    searchInput.length < MIN_USERNAME_LENGTH ||
    searchInput.length > MAX_USERNAME_LENGTH ||
    /\s/.test(searchInput);

  // Update dropdown position when showing results
  useEffect(() => {
    if (showResults && inputRef.current) {
      const inputRect = inputRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: inputRect.bottom + window.scrollY + 4,
        left: inputRect.left + window.scrollX,
        width: inputRect.width,
      });
    }
  }, [showResults]);

  const handleInputChange = (e) => {
    let value = e.target.value.replace(/\s/g, ""); // no spaces
    if (value.length > MAX_USERNAME_LENGTH) {
      value = value.substring(0, MAX_USERNAME_LENGTH);
    }

    dispatch(setSearchInput(value));

    if (hasSearched) {
      dispatch(setSearchResults(null));
      setHasSearched(false);
    }
  };

  const handleSearch = async () => {
    if (isSearchDisabled) return;

    setLoading(true);
    try {
      const response = await SearchInfluencer(searchInput.trim());
      if (response?.status === 200 && response?.data) {
        dispatch(setSearchResults(response?.data?.data)); // store object
      } else {
        dispatch(setSearchResults(null));
      }
      setHasSearched(true);
      setFocused(true); // Keep focused to show results
    } catch (error) {
      console.error("Search failed:", error);
      dispatch(setSearchResults(null));
      setHasSearched(true);
      setFocused(true); // Keep focused to show results
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !isSearchDisabled) {
      handleSearch();
    }
  };

  const handleBlur = () => {
    setTimeout(() => {
      if (!loading) {
        setFocused(false);
      }
    }, 150);
  };

  // Close dropdown if click happens outside input & dropdown
  useEffect(() => {
    function handleClickOutside(e) {
      if (
        inputRef.current &&
        !inputRef.current.contains(e.target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setFocused(false);
        setHasSearched(false);
      }
    }

    if (showResults) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showResults]);

  return (
    <>
      <div className="flex gap-2">
        <div className="flex flex-col w-full items-center relative">
          {/* Input Container - Fixed height */}
          <div className="w-full rounded-[5px] border-[0.5px] border-stroke-gray text-primary-text shadow-sm">
            {/* Input */}
            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                value={searchInput}
                onChange={handleInputChange}
                onFocus={() => setFocused(true)}
                onBlur={handleBlur}
                onKeyPress={handleKeyPress}
                placeholder="Search by username (1-15 chars, no spaces)"
                className="w-full h-[2.4rem] px-4 py-3 focus:outline-none"
                maxLength={MAX_USERNAME_LENGTH}
                autoComplete="new-password"
                autoCorrect="off"
                autoCapitalize="none"
                spellCheck="false"
              />
            </div>
          </div>

          {/* Validation */}
          {searchInput &&
            (searchInput.length < MIN_USERNAME_LENGTH ||
              searchInput.length > MAX_USERNAME_LENGTH ||
              /\s/.test(searchInput)) && (
              <div className="text-xs text-red-500 mt-1">
                {/\s/.test(searchInput)
                  ? "Spaces not allowed"
                  : `Username must be ${MIN_USERNAME_LENGTH}-${MAX_USERNAME_LENGTH} characters`}
              </div>
            )}
        </div>

        <SecondaryButton
          onClick={handleSearch}
          loading={loading}
          disabled={isSearchDisabled}
          className="w-[6rem] disabled:cursor-not-allowed"
        >
          Search
        </SecondaryButton>
      </div>

      {/* Results - Portal-style dropdown positioned absolutely to body */}
      {showResults && (
        <div
          ref={dropdownRef}
          className="fixed z-[9999] bg-primary border-[0.5px] border-stroke-gray w-full rounded-[5px] shadow-lg"
          style={{
            top: `${dropdownPosition.top}px`,
            left: `${dropdownPosition.left}px`,
            width: `${dropdownPosition.width}px`,
          }}
        >
          {searchResults ? (
            (() => {
              const isSelected = selectedInfluencers.some(
                (inf) => inf.username === searchResults.username
              );
              return (
                <div
                  className={`px-4 py-3 bg-transparent cursor-pointer flex items-center gap-2 hover:bg-white/5 rounded-[5px]`}
                  onMouseDown={() => {
                    if (!isSelected)
                      dispatch(toggleSelectInfluencer(searchResults));
                    setFocused(false);
                    setHasSearched(false);
                  }}
                >
                  <img
                    src={searchResults.profile_image_url}
                    alt={searchResults.name}
                    className="size-[30px] rounded-full"
                  />
                  <div className="flex flex-col">
                    <span className="flex items-center gap-1 text-xs font-medium">
                      {searchResults.name}
                      {searchResults.verified && (
                        <img
                          src={"/assets/influencer/Verified.svg"}
                          alt="verified"
                          className="size-4 rounded-full"
                        />
                      )}
                    </span>
                    <span className="text-xxs text-low-opacity font-jetbrains-mono font-regular uppercase">
                      @{searchResults.username}
                    </span>
                  </div>
                  {isSelected && (
                    <span className="ml-auto text-xxs text-medium-opacity">
                      Selected
                    </span>
                  )}
                </div>
              );
            })()
          ) : (
            <div className="px-4 py-3 text-xs text-gray-500">
              No results found
            </div>
          )}
        </div>
      )}
    </>
  );
}
