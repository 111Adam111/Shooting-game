import express from "express";
import "dotenv/config";
import { addScore, highscores } from "./highscoreControllers.js";
import mongoose from "mongoose";
import cors from "cors";

const app = express();

const port = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use(cors());

app.post("/add-score", addScore);
app.get("/", highscores);

app.listen(port);
