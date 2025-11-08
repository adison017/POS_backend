import {
  createKitchenTicket,
  findKitchenTickets,
  updateKitchenTicket,
} from '../models/kitchenTicketModel.js'
import { io } from '../server.js'

export const listKitchenTickets = async (req, res, next) => {
  try {
    // Get limit parameter (default to 100, max 200)
    const limit = Math.min(parseInt(req.query.limit) || 100, 200)
    
    const tickets = await findKitchenTickets(limit)
    res.json(tickets)
  } catch (error) {
    next(error)
  }
}

export const addKitchenTicket = async (req, res, next) => {
  try {
    const newTicket = await createKitchenTicket(req.body)
    res.status(201).json(newTicket)
    io.emit('kitchen-ticket:created', newTicket)
  } catch (error) {
    next(error)
  }
}

export const editKitchenTicket = async (req, res, next) => {
  try {
    const updatedTicket = await updateKitchenTicket(req.params.id, req.body)
    res.json(updatedTicket)
    io.emit('kitchen-ticket:updated', updatedTicket)
  } catch (error) {
    next(error)
  }
}