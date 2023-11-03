"use client";
import React from "react";
import CowboyBoardWrapper from "../components/cowboyBoardWrapper/CowboyBoardWrapper";
import { useSelector } from "react-redux";
import { ScoreState } from "../redux/types";
import styles from "./styles.module.scss";
import Link from "next/link";

const Statistics = () => {
  const { score, shots }: ScoreState = useSelector(
    (state: { score: ScoreState }) => state.score,
  );
  return (
    <CowboyBoardWrapper>
      <div className={styles.stats}>
        <div className={styles.score}>{score}</div>
        <div>Shots: {shots}</div>
        <div>Accuracy: {shots ? `${(score / shots).toFixed(1)}%` : "0%"}</div>
      </div>
      <div className={styles.nav}>
        <Link href={"./game"} className="link">
          Restart
        </Link>
        <Link href={"./"} className="link">
          Menu
        </Link>
      </div>
    </CowboyBoardWrapper>
  );
};

export default Statistics;
