import {
  createPaymentMethod,
  findActivePaymentMethods,
  updatePaymentMethod,
} from '../models/paymentMethodModel.js'

export const listPaymentMethods = async (_req, res, next) => {
  try {
    const methods = await findActivePaymentMethods()
    res.json(methods)
  } catch (error) {
    next(error)
  }
}

export const addPaymentMethod = async (req, res, next) => {
  try {
    const newMethod = await createPaymentMethod(req.body)
    res.status(201).json(newMethod)
  } catch (error) {
    next(error)
  }
}

export const editPaymentMethod = async (req, res, next) => {
  try {
    const updatedMethod = await updatePaymentMethod(req.params.id, req.body)
    res.json(updatedMethod)
  } catch (error) {
    next(error)
  }
}

