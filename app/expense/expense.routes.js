import { Router } from "express";
import { expenseController } from "./expense.controller.js";

const expenseRouter = Router();

expenseRouter.post("/", expenseController.createExpense);
expenseRouter.get("/", expenseController.allExpenses);
expenseRouter.patch("/:id", expenseController.updateExpense);
expenseRouter.delete("/:id", expenseController.deleteExpense);

export default expenseRouter;
