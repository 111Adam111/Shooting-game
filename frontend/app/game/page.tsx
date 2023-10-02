"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Target, { TargetProps } from "./target/Target";
import { restartTargets } from "../redux/slices/targetsSlice";
import { ScoreState, TargetsState } from "../redux/types";
import Link from "next/link";

const Game = () => {
  const [isRunning, setIsRunning] = useState(true);
  const [countDown, setCountDown] = useState(3);
  const targets: TargetProps[] = useSelector((state: TargetsState) => state.targets);
  const score : number = useSelector((state: ScoreState) => state.score);
  const dispatch = useDispatch();

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (isRunning && countDown > 0) {
        setCountDown((prevCount) => prevCount - 0.1);
      } else {
        setIsRunning(false);
        setCountDown(3);
        dispatch(restartTargets());
        clearInterval(intervalId);
      }
    }, 100);

    return () => clearInterval(intervalId);
  }, [isRunning, countDown]);

  return (
    <div>
      {countDown.toFixed(2)}
      <div>{score}</div>
      <Link href="/">menu</Link>
      {targets.map((target) => (
        <Target key={Math.random() * 10000} {...target} />
      ))}
    </div>
  );
};

export default Game;
