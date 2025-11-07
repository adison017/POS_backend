import { createExpense, findExpenses } from '../models/expenseModel.js'

export const listExpenses = async (_req, res, next) => {
  try {
    const expenses = await findExpenses()
    res.json(expenses)
  } catch (error) {
    next(error)
  }
}

export const addExpense = async (req, res, next) => {
  try {
    const newExpense = await createExpense(req.body)
    res.status(201).json(newExpense)
  } catch (error) {
    next(error)
  }
}

