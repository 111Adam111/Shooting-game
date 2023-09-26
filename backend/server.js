import express from "express";
import "dotenv/config";
import { addScore } from "./highscoreControllers";

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.post("/add-score", addScore);

app.listen(port);
