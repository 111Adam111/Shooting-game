import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TargetProps } from "../../game/target/Target";

interface TargetsState {
  targets: TargetProps[];
}

const initialState: TargetsState = {
  targets: [],
};

export const targetsSlice = createSlice({
  name: "targets",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<TargetProps>) => {
      state.targets.push(action.payload);
    },
    remove: (state, action: PayloadAction<TargetProps>) => {
      state.targets.filter((target) => (
        target.x !== action.payload.x && 
        target.y !== action.payload.y
      ));
    },
  },
});

export const { add, remove } = targetsSlice.actions;

export default targetsSlice.reducer;
