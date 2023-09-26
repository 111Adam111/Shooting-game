import mongoose from "mongoose";

const scoreSchema = new mongoose.Schema({
  name: String,
  score: Number,
  shots: Number,
});

export const Score = mongoose.model("highscores", scoreSchema);
