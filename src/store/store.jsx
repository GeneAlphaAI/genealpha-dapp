import { applyMiddleware, configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import tokenReducer from "./slices/token";
export const store = configureStore(
  {
    reducer: {
      token: tokenReducer,
    },
  },
  applyMiddleware(thunk)
);

export default store;
