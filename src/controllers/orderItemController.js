import { createOrderItem, findOrderItems } from '../models/orderItemModel.js'
import { io } from '../server.js'

export const listOrderItems = async (req, res, next) => {
  try {
    const items = await findOrderItems({ orderId: req.query.orderId })
    res.json(items)
  } catch (error) {
    next(error)
  }
}

export const addOrderItem = async (req, res, next) => {
  try {
    const newItem = await createOrderItem(req.body)
    res.status(201).json(newItem)
    io.emit('order-item:created', newItem)
  } catch (error) {
    next(error)
  }
}

