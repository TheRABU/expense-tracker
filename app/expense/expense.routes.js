import { Router } from "express";
import { expenseController } from "./expense.controller.js";

const expenseRouter = Router();

expenseRouter.post("/", expenseController.createExpense);
expenseRouter.get("/", expenseController.allExpenses);
export default expenseRouter;
