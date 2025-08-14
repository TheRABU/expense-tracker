import Expense from "./expense.model.js";
import { expenseServices } from "./expense.services.js";
import { sendSuccess } from "../utils/sendSuccess.js";
import AppError from "../utils/AppError.js";

const createExpense = async (req, res, next) => {
  try {
    const { title, amount, category, date, _id } = req.body;

    if (!title || !amount || !category || !date) {
      return "All fields must be filed!";
    }

    const isExpenseAlreadyExists = await Expense.findOne({ title });
    if (isExpenseAlreadyExists) {
      res.status(403).json({
        message: "Expense already exist",
      });
    }

    const expense = await Expense.create({
      title,
      amount,
      category,
      date,
    });

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

const updateExpense = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const expense = await Expense.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });
    if (!expense) {
      return next(new AppError("Expense not found", 404));
    }
    sendSuccess(res, "Expense updated successfully", expense);
  } catch (error) {
    next(error);
  }
};

const deleteExpense = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedExpense = await Expense.findByIdAndDelete(id);

    if (deleteExpense) {
      return next(new AppError("Expense not found", 404));
    }
    sendSuccess(res, "expense deleted successfully", deletedExpense);
  } catch (error) {
    next(error);
  }
};

export const expenseController = {
  createExpense,
  allExpenses,
  updateExpense,
  deleteExpense,
};
