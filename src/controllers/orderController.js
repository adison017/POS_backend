import { createOrder, findLatestOrder, findOrders, updateOrder } from '../models/orderModel.js'
import { io } from '../server.js'

export const listOrders = async (_req, res, next) => {
  try {
    const limit = _req.query?.limit ? parseInt(_req.query.limit) : undefined
    const offset = _req.query?.offset ? parseInt(_req.query.offset) : undefined
    const from = _req.query?.from
    const to = _req.query?.to
    const orders = await findOrders({ limit, offset, from, to })
    res.json(orders)
  } catch (error) {
    next(error)
  }
}

export const addOrder = async (req, res, next) => {
  try {
    const newOrder = await createOrder(req.body)
    res.status(201).json(newOrder)
    io.emit('order:created', newOrder)
  } catch (error) {
    next(error)
  }
}

export const editOrder = async (req, res, next) => {
  try {
    const updatedOrder = await updateOrder(req.params.id, req.body)
    res.json(updatedOrder)
    io.emit('order:updated', updatedOrder)
  } catch (error) {
    next(error)
  }
}

export const getLatestOrderNo = async (_req, res, next) => {
  try {
    const latest = await findLatestOrder()
    const latestOrderNo = latest?.order_no ?? null
    res.json({ latestOrderNo })
  } catch (error) {
    next(error)
  }
}

