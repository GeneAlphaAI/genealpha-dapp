// store/influencer.js
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  searchInput: "",
  selectedInfluencers: [],
  searchResults: null,
  selectedCategories: [],
  agentName: "",
  dataUpdated: false,
};
const influencerSlice = createSlice({
  name: "influencer",
  initialState,
  reducers: {
    setSearchInput: (state, action) => {
      state.searchInput = action.payload;
    },
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
    setSelectedCategories: (state, action) => {
      // Action payload example: ["crypto", "stocks"]
      state.selectedCategories = action.payload;
    },
    toggleSelectInfluencer: (state, action) => {
      const influencer = action.payload;
      const exists = state.selectedInfluencers.some(
        (i) => i.username === influencer.username
      );

      if (exists) {
        // Remove influencer
        state.selectedInfluencers = state.selectedInfluencers.filter(
          (i) => i.username !== influencer.username
        );
      } else {
        if (state.selectedInfluencers.length >= 5) return; // limit 5

        // Evenly distribute influence among all influencers
        const newList = [
          ...state.selectedInfluencers,
          { ...influencer, influence: 0 },
        ];
        const equalShare = Math.floor(100 / newList.length);

        newList.forEach((inf) => (inf.influence = equalShare));

        // Adjust last influencer's influence if total isn't exactly 100
        const total = newList.reduce((sum, inf) => sum + inf.influence, 0);
        if (total !== 100) {
          newList[newList.length - 1].influence += 100 - total;
        }

        state.selectedInfluencers = newList;
      }

      state.searchInput = "";
    },
    updateInfluence: (state, action) => {
      const { username, influence } = action.payload;
      const idx = state.selectedInfluencers.findIndex(
        (inf) => inf.username === username
      );
      if (idx === -1) return;

      const influencers = [...state.selectedInfluencers];
      const n = influencers.length;
      const minValue = 10;
      const maxValue = 100 - minValue * (n - 1);

      const clamped = Math.max(minValue, Math.min(influence, maxValue));
      const diff = clamped - influencers[idx].influence;
      influencers[idx].influence = clamped;

      if (diff > 0) {
        // INCREASE → take from others above minValue
        let remainingDiff = diff;
        const adjustable = influencers.filter(
          (inf, i) => i !== idx && inf.influence > minValue
        );
        const totalAvailable = adjustable.reduce(
          (sum, inf) => sum + (inf.influence - minValue),
          0
        );

        adjustable.forEach((inf) => {
          if (remainingDiff <= 0) return;
          const take = Math.min(
            ((inf.influence - minValue) / totalAvailable) * diff,
            inf.influence - minValue
          );
          inf.influence -= take;
          remainingDiff -= take;
        });
      } else if (diff < 0) {
        // DECREASE → give to others
        let remainingAdd = Math.abs(diff);
        const adjustable = influencers.filter((inf, i) => i !== idx);
        const totalRoom = adjustable.reduce(
          (sum, inf) => sum + (maxValue - inf.influence),
          0
        );

        adjustable.forEach((inf) => {
          if (remainingAdd <= 0) return;
          const add = Math.min(
            ((maxValue - inf.influence) / totalRoom) * Math.abs(diff),
            maxValue - inf.influence
          );
          inf.influence += add;
          remainingAdd -= add;
        });
      }

      // Final rounding fix to ensure exactly 100
      const total = influencers.reduce((sum, inf) => sum + inf.influence, 0);
      const roundingError = 100 - total;
      if (Math.abs(roundingError) > 0.001) {
        influencers[0].influence += roundingError;
      }

      // Round to 1 decimal place
      influencers.forEach((inf) => {
        inf.influence = Math.round(inf.influence * 10) / 10; // for 1 decimal place
      });

      state.selectedInfluencers = influencers;
    },
    removeInfluencer: (state, action) => {
      const usernameToRemove = action.payload.username;
      state.selectedInfluencers = state.selectedInfluencers.filter(
        (influencer) => influencer.username !== usernameToRemove
      );
    },
    setAgentName: (state, action) => {
      state.agentName = action.payload;
    },
    setDataUpdated: (state, action) => {
      state.dataUpdated = action.payload;
    },
    addInfluencersFromAccounts: (state, action) => {
      const accounts = action.payload;

      const mapped = accounts.map((acc) => ({
        ...acc.account_info, // spread all account_info fields at root
        influence: acc.influence ?? 0,
      }));

      state.selectedInfluencers = [...state.selectedInfluencers, ...mapped];
    },

    resetInfluencerState: () => initialState,
  },
});

export const {
  setSearchInput,
  setSearchResults,
  toggleSelectInfluencer,
  removeInfluencer,
  updateInfluence,
  setSelectedCategories,
  setAgentName,
  resetInfluencerState,
  setDataUpdated,
  addInfluencersFromAccounts,
} = influencerSlice.actions;
export default influencerSlice.reducer;
