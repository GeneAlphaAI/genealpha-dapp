import { applyMiddleware, configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import tokenReducer from "./slices/token";
import influencerReducer from "./slices/influencer";
import modelReducer from "./slices/model";
export const store = configureStore(
  {
    reducer: {
      token: tokenReducer,
      influencer: influencerReducer,
      model: modelReducer,
    },
  },
  applyMiddleware(thunk)
);

export default store;
