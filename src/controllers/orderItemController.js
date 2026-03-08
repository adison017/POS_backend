import { createOrderItem, findOrderItems, deleteOrderItems } from '../models/orderItemModel.js'
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

export const removeOrderItems = async (req, res, next) => {
  try {
    const { orderId } = req.query
    if (!orderId) {
      return res.status(400).json({ error: 'orderId is required' })
    }
    await deleteOrderItems(orderId)
    res.status(204).end()
  } catch (error) {
    next(error)
  }
}

