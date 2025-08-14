import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import AppError from "./utils/AppError.js";
import expenseRouter from "./expense/expense.routes.js";

const app = express();

dotenv.config();

app.use(express.json());
app.use(cors());

// routes
app.use("/expenses", expenseRouter);

app.get("/", (req, res) => {
  res.status(201).json({
    success: true,
    message: "Server started successfully sir",
  });
});

app.get("/error", (req, res, next) => {
  next(new AppError("This is a custom error!", 400));
});

// Global Error Handler
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

export default app;
