import { configureStore } from "@reduxjs/toolkit";
import scoreReducer from "./slices/scoreSlice";

export const store = configureStore({
  reducer: {
    score: scoreReducer,
  },
});
