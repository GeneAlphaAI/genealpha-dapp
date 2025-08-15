import { applyMiddleware, configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import tokenReducer from "./slices/token";
import influencerReducer from "./slices/influencer";
export const store = configureStore(
  {
    reducer: {
      token: tokenReducer,
      influencer: influencerReducer,
    },
  },
  applyMiddleware(thunk)
);

export default store;
