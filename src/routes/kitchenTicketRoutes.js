import { Router } from 'express'
import {
  addKitchenTicket,
  editKitchenTicket,
  listKitchenTickets,
} from '../controllers/kitchenTicketController.js'

const router = Router()

router.get('/', listKitchenTickets)
router.post('/', addKitchenTicket)
router.patch('/:id', editKitchenTicket)

export default router

