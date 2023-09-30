import React from "react";
import { useSelector } from "react-redux";
import Target from "./target/Target";
import { TargetsState } from "../redux/types";

const Game = () => {
  const targets = useSelector((state: TargetsState) => state.targets);
  return <div>{targets.map(target => (
    <Target key={`${target.x}-${target.y}`} {...target}/>
  ))}</div>;
};

export default Game;
