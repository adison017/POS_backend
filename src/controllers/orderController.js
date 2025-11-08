import {
  createOrder,
  findOrders,
  findLatestOrder,
  updateOrder,
} from '../models/orderModel.js'

export const listOrders = async (req, res, next) => {
  try {
    // Get pagination parameters
    const limit = parseInt(req.query.limit) || 50
    const offset = parseInt(req.query.offset) || 0
    const from = req.query.from
    const to = req.query.to
    
    // Ensure limit is reasonable
    const safeLimit = Math.min(Math.max(limit, 1), 100)
    
    const orders = await findOrders({
      limit: safeLimit,
      offset,
      from,
      to
    })
    
    res.json(orders)
  } catch (error) {
    next(error)
  }
}

export const addOrder = async (req, res, next) => {
  try {
    const newOrder = await createOrder(req.body)
    res.status(201).json(newOrder)
  } catch (error) {
    next(error)
  }
}

export const editOrder = async (req, res, next) => {
  try {
    const updatedOrder = await updateOrder(req.params.id, req.body)
    res.json(updatedOrder)
  } catch (error) {
    next(error)
  }
}

export const getLatestOrder = async (_req, res, next) => {
  try {
    const latestOrder = await findLatestOrder()
    res.json({
      latestOrderNo: latestOrder?.order_no ?? null
    })
  } catch (error) {
    next(error)
  }
}