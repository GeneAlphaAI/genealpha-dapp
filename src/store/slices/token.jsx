// store/token.js
import { createSlice } from "@reduxjs/toolkit";

const tokenSlice = createSlice({
  name: "token",
  initialState: {
    selectedToken: null,
    options: [{ label: "Cocoro", value: "COCORO" }],
  },
  reducers: {
    setTokenOptions: (state, action) => {
      state.options = action.payload;
    },
    selectToken: (state, action) => {
      state.selectedToken = action.payload;
    },
  },
});

export const { setTokenOptions, selectToken } = tokenSlice.actions;
export default tokenSlice.reducer;
