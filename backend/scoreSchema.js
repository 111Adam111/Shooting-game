import mongoose from "mongoose";

const scoreSchema = new mongoose.Schema({
  name: String,
  score: Number,
  shots: Number,
  device: String,
  resolution: String,
});

export const Score = mongoose.model("highscores", scoreSchema);
