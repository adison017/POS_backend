import { createIncome, findIncome } from '../models/incomeModel.js'

export const listIncome = async (_req, res, next) => {
  try {
    const items = await findIncome()
    res.json(items)
  } catch (error) {
    next(error)
  }
}

export const addIncome = async (req, res, next) => {
  try {
    const newIncome = await createIncome(req.body)
    res.status(201).json(newIncome)
  } catch (error) {
    next(error)
  }
}

