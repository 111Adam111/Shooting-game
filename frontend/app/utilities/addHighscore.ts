import axios from "axios";

export type ScoreProps = {
    name: string,
    score: number,
    shots: number
}

export const addHighscore = async (name: string, score: number, shots: number) => {
  try {
    const { data } = await axios.post(
      "http://localhost:5000/add-score",
      { name: name, score: score, shots: shots },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  } catch (error) {
    console.error(error);
  }
};
