import Expense from "./expense.model.js";

const createExpenseService = async (payload) => {
  const { title, amount, category, date, _id } = payload;

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

  return expense;
};

export const expenseServices = {
  createExpenseService,
};
