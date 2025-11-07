import { Router } from 'express'
import { addOrderItem, listOrderItems } from '../controllers/orderItemController.js'

const router = Router()

router.get('/', listOrderItems)
router.post('/', addOrderItem)

export default router

