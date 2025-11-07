import { Router } from 'express'
import {
  addPaymentMethod,
  editPaymentMethod,
  listPaymentMethods,
} from '../controllers/paymentMethodController.js'

const router = Router()

router.get('/', listPaymentMethods)
router.post('/', addPaymentMethod)
router.patch('/:id', editPaymentMethod)

export default router

