import express from "express";
import "dotenv/config";
import { addScore, highscores } from "./highscoreControllers.js";
import mongoose from "mongoose";

const app = express();

const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());

app.post("/add-score", addScore);
app.get("/", highscores);

app.listen(port);
