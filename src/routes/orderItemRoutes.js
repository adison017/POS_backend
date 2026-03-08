import { Router } from 'express'
import { addOrderItem, listOrderItems, removeOrderItems } from '../controllers/orderItemController.js'

const router = Router()

router.get('/', listOrderItems)
router.post('/', addOrderItem)
router.delete('/', removeOrderItems)

export default router

