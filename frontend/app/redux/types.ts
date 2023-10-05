import { TargetProps } from "../components/target/Target";

export interface ScoreState {
  score: number;
  shots: number;
}

export interface TargetsState {
  targets: TargetProps[];
}
