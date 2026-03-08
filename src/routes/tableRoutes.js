import { Router } from 'express'
import * as TableController from '../controllers/tableController.js'

const router = Router()

router.get('/', TableController.getTables)
router.post('/', TableController.createTable)
router.patch('/:id', TableController.updateTable)
router.delete('/:id', TableController.deleteTable)

export default router
