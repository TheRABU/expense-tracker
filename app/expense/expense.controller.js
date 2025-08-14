import Expense from "./expense.model.js";
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

const allExpenses = async (req, res, next) => {
  try {
    // for filtering else show all
    const { category, minAmount, maxAmount } = req.query;

    const filter = {};
    if (category) {
      filter.category = category;
    }
    if (minAmount || maxAmount) {
      filter.amount = {};
      if (minAmount) filter.amount.$gte = Number(minAmount);
      if (maxAmount) filter.amount.$lte = Number(maxAmount);
    }

    const expenses = await Expense.find(filter);

    res.status(200).json({
      success: true,
      message: "Expenses fetched successfully",
      body: expenses,
    });
  } catch (error) {
    next(error);
  }
};

export const expenseController = {
  createExpense,
  allExpenses,
};
