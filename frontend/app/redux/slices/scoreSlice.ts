import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ScoreState } from "../types";


const initialState: ScoreState = {
  score: 0,
};

export const scoreSlice = createSlice({
  name: "score",
  initialState,
  reducers: {
    increment: (state, action: PayloadAction<number>) => {
      state.score += action.payload;
    },
    reset: (state) => {
      state.score = 0;
    },
  },
});

export const { increment, reset } = scoreSlice.actions;

export default scoreSlice.reducer;
