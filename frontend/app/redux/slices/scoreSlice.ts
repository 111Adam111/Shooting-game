import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: number = 0;

export const scoreSlice = createSlice({
  name: "score",
  initialState,
  reducers: {
    increment: (state: number, action: PayloadAction<number>) => {
      return state + action.payload;
    },
    reset: (state) => {
      return 0;
    },
  },
});

export const { increment, reset } = scoreSlice.actions;

export default scoreSlice.reducer;
