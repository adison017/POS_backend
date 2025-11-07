import { Router } from 'express'
import { addOrder, editOrder, getLatestOrderNo, listOrders } from '../controllers/orderController.js'

const router = Router()

router.get('/', listOrders)
router.get('/latest', getLatestOrderNo)
router.post('/', addOrder)
router.patch('/:id', editOrder)

export default router

