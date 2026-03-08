import { Router } from 'express'
import { addOrder, editOrder, getLatestOrder, listOrders, getOpenOrderByTable } from '../controllers/orderController.js'

const router = Router()

router.get('/', listOrders)
router.get('/latest', getLatestOrder)
router.get('/table/:tableId/open', getOpenOrderByTable)
router.post('/', addOrder)
router.patch('/:id', editOrder)

export default router

