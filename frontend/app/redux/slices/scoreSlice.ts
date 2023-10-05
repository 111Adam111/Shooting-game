import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ScoreState } from "../types";

const initialState: ScoreState = {
  score: 0,
  shots: 0,
};

export const scoreSlice = createSlice({
  name: "score",
  initialState,
  reducers: {
    incrementScore: (state: ScoreState, action: PayloadAction<number>) => {
      return { score: state.score + action.payload, shots: state.shots + 1 };
    },
    resetScore: () => {
      return { score: 0, shots: 0 };
    },
  },
});

export const { incrementScore, resetScore } = scoreSlice.actions;

export default scoreSlice.reducer;
