import React from "react";
import { maxPointsPerShot } from "../gameSettings";
import { useDispatch } from "react-redux";
import { increment } from "../../redux/slices/scoreSlice";
import { remove } from "../../redux/slices/targetsSlice";

interface ShotProps extends TargetProps {
  click: React.MouseEvent<HTMLElement>;
}

export type TargetProps = {
  x: number;
  y: number;
  size: number;
};

const Target = ({ x, y, size }: TargetProps) => {
  const dispatch = useDispatch();

  const shot = ({ click, x, y, size }: ShotProps): void => {
    const radius: number = size / 2;
    const targetCenterX: number = x + radius;
    const targetCenterY: number = y + radius;
    const distance: number = Math.sqrt(
      (click.clientX - targetCenterX) ** 2 + (click.clientY - targetCenterY) ** 2,
    );
    let score: number =
      maxPointsPerShot - Math.floor((distance * maxPointsPerShot) / radius);
    dispatch(increment(score));
    dispatch(remove({x, y, size}));
  };

  return (
    <div
      className="target"
      onClick={(click) => shot({ click, x, y, size })}
      style={{ left: `${y}px`, top: `${x}px`, width: `${size}px`, height: `${size}px` }}
    />
  );
};

export default Target;
