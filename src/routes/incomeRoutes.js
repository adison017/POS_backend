import { Router } from 'express'
import { addIncome, listIncome } from '../controllers/incomeController.js'

const router = Router()

router.get('/', listIncome)
router.post('/', addIncome)

export default router

