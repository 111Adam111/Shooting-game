import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ScoreState {
  count: number;
}

const initialState: ScoreState = {
  count: 0,
};

export const scoreSlice = createSlice({
  name: "score",
  initialState,
  reducers: {
    increment: (state, action: PayloadAction<number>) => {
      state.count += action.payload;
    },
    reset: (state) => {
      state.count = 0;
    },
  },
});

export const { increment, reset } = scoreSlice.actions;

export default scoreSlice.reducer;
