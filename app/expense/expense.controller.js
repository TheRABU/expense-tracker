import { expenseServices } from "./expense.services.js";

const createExpense = async (req, res, next) => {
  try {
    const expense = await expenseServices.createExpenseService(req.body);

    res.status(201).json({
      success: true,
      message: "new Expense created successfully",
      body: expense,
    });
  } catch (error) {
    next(error);
  }
};

export const expenseController = {
  createExpense,
};
