import React from "react";
import styles from "./styles.module.scss";

const CowboyBoardWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.container}>
      <div className={styles.cowboy}>
        <div className={styles.board}>{children}</div>
      </div>
    </div>
  );
};

export default CowboyBoardWrapper;
