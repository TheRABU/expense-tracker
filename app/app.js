import express from "express";
import dotenv from "dotenv";
import cors from "cors";

const app = express();

dotenv.config();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.status(201).json({
    success: true,
    message: "Server started successfully sir",
  });
});

export default app;
