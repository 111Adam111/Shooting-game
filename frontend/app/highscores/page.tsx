import React from "react";
import CowboyBoardWrapper from "../components/cowboyBoardWrapper/CowboyBoardWrapper";
import { getHighscores } from "../utilities/getHighscores";
import styles from "./styles.module.scss";

type Record = {
  name: string;
  score: number;
  id: string;
  shots: number;
};

const Highscores = async () => {
  const data = await getHighscores();
  const highscores = data?.data;
  return (
    <div>
      <CowboyBoardWrapper>
        <div className={styles.container}>
          {data ? (
            data.status !== 200 ? (
              <div className={styles.error}>Error: {data.statusText}</div>
            ) : (
              highscores.map((record: Record) => (
                <div className={styles.record} key={record.id}>
                  <div>{record.name}</div>
                  <div>{record.score}</div>
                </div>
              ))
            )
          ) : (
            <div className={styles.loading}>Loading...</div>
          )}
        </div>
      </CowboyBoardWrapper>
    </div>
  );
};

export default Highscores;
