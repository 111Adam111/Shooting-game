import { configureStore } from "@reduxjs/toolkit";
import scoreReducer from "./slices/scoreSlice";
import targetsReducer from "./slices/targetsSlice";

export const store = configureStore({
  reducer: {
    score: scoreReducer,
    targets: targetsReducer
  },

});
