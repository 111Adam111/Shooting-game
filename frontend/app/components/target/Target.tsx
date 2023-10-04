import React from "react";
import styles from "./styles.module.scss";
import { maxPointsPerShot } from "../../game/gameSettings";
import { useDispatch } from "react-redux";
import { increment } from "../../redux/slices/scoreSlice";
import { addTarget, removeTarget } from "../../redux/slices/targetsSlice";

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
    if (score > 0) {
      dispatch(increment(score));
      dispatch(removeTarget({ x, y, size }));
      dispatch(addTarget());
    }
  };

  return (
    <div
      className={styles.target}
      onMouseDown={(click) => shot({ click, x, y, size })}
      style={{ left: `${x}px`, top: `${y}px`, width: `${size}px`, height: `${size}px` }}
    />
  );
};

export default Target;
