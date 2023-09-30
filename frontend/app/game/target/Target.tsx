import React from "react";
import { maxPointsPerShot } from "../gameSettings";

interface shotProps extends TargetProps {
  click: React.MouseEvent<HTMLElement>;
}

type TargetProps = {
  x: number;
  y: number;
  size: number;
};

const shot = ({ click, x, y, size }: shotProps) => {
  const radius: number = size / 2;
  const targetCenterX: number = x + radius;
  const targetCenterY: number = y + radius;
  const distance: number = Math.sqrt(
    (click.clientX - targetCenterX) ** 2 + (click.clientY - targetCenterY) ** 2,
  );
  let score: number =
    maxPointsPerShot - Math.floor((distance * maxPointsPerShot) / radius);
};

const Target = ({ x, y, size }: TargetProps) => {
  return (
    <div
      className="target"
      onClick={(click) => shot({ click, x, y, size })}
      style={{ left: `${y}px`, top: `${x}px`, width: `${size}px`, height: `${size}px` }}
    />
  );
};

export default Target;
