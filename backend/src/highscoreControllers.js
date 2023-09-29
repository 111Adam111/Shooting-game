import { Score } from "./scoreSchema.js";

export const addScore = async (req, res) => {
  try {
    const { name, score, shots } = req.body;

    await Score.create({ name, score, shots });

    res.status(201).json({ message: "Score added successfully" });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};

export const highscores = async (req, res) => {
  try {
    const highScores = await Score.find().sort({ score: -1 });
    res.json(highScores);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};
