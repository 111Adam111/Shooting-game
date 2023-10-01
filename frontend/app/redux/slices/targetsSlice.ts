import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TargetProps } from "../../game/target/Target";
import { targetsAmount } from "../../game/gameSettings";

const newTarget = (): TargetProps => {
  const randomPosition = (max: number): number => Math.random() * max;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  const elementSize: number = (windowHeight + windowWidth) / 10;
  const targetX: number = randomPosition(windowWidth - elementSize);
  const targetY: number = randomPosition(windowHeight - elementSize);

  return { x: targetX, y: targetY, size: elementSize };
};

const createStartingTargets = (targetsAmount: number) => {
  const startingTargets: TargetProps[] = [];
  for (let i = 0; i < targetsAmount; i++) {
    startingTargets.push(newTarget());
  }
  return startingTargets;
};

const initialState: TargetProps[] = createStartingTargets(targetsAmount);

export const targetsSlice = createSlice({
  name: "targets",
  initialState,
  reducers: {
    addTarget: (state) => {
      state.push(newTarget());
    },
    removeTarget: (state, action: PayloadAction<TargetProps>) => {
      return state.filter(
        (target) => target.x !== action.payload.x && target.y !== action.payload.y,
      );
    },
    restartTargets: () => {
      return createStartingTargets(targetsAmount);
    },
  },
});

export const { addTarget, removeTarget, restartTargets } = targetsSlice.actions;

export default targetsSlice.reducer;
