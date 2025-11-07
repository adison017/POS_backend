import { Router } from 'express'
import { getHealthStatus } from '../controllers/healthController.js'
import expenseRoutes from './expenseRoutes.js'
import incomeRoutes from './incomeRoutes.js'
import kitchenTicketRoutes from './kitchenTicketRoutes.js'
import menuCategoryRoutes from './menuCategoryRoutes.js'
import menuItemRoutes from './menuItemRoutes.js'
import orderItemRoutes from './orderItemRoutes.js'
import orderRoutes from './orderRoutes.js'
import paymentMethodRoutes from './paymentMethodRoutes.js'
import storageRoutes from './storageRoutes.js'

const router = Router()

router.get('/health', getHealthStatus)
router.use('/menu-categories', menuCategoryRoutes)
router.use('/menu-items', menuItemRoutes)
router.use('/orders', orderRoutes)
router.use('/order-items', orderItemRoutes)
router.use('/kitchen-tickets', kitchenTicketRoutes)
router.use('/payment-methods', paymentMethodRoutes)
router.use('/expenses', expenseRoutes)
router.use('/income', incomeRoutes)
router.use('/storage', storageRoutes)

export default router

