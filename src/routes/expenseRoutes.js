import { Router } from 'express'
import { addExpense, listExpenses } from '../controllers/expenseController.js'

const router = Router()

router.get('/', listExpenses)
router.post('/', addExpense)

export default router

