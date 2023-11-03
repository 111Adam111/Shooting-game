"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Target, { TargetProps } from "../components/target/Target";
import { clearTargets, resetTargets } from "../redux/slices/targetsSlice";
import { ScoreState, TargetsState } from "../redux/types";
import { useRouter } from "next/navigation";
import { resetScore } from "../redux/slices/scoreSlice";
import styles from "./styles.module.scss";


const Game = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isRunning, setIsRunning] = useState(true);
  const [countDown, setCountDown] = useState(3);
  const targets: TargetProps[] = useSelector((state: TargetsState) => state.targets);
  const { score, shots }: ScoreState = useSelector(
    (state: { score: ScoreState }) => state.score,
  );

  useEffect(() => {
    dispatch(resetTargets());
    dispatch(resetScore());
    setCountDown(3);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (isRunning && countDown > 0) {
        setCountDown((prevCount) => prevCount - 0.1);
      } else {
        setIsRunning(false);
        dispatch(clearTargets());
        clearInterval(intervalId);
        router.push("../statistics");
      }
    }, 100);

    return () => clearInterval(intervalId);
  }, [isRunning, countDown]);

  return (
    <div>
      <div className={styles.stats}>
        <div>{parseFloat(countDown.toFixed(1)) <= 0 ? "0" : countDown.toFixed(1)}</div>
        <div>{score}</div>
      </div>
      {targets.map((target) => (
        <Target key={Math.random() * 10000} {...target} />
      ))}
    </div>
  );
};

export default Game;
