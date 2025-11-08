import { Router } from 'express'
import {
  addMenuItem,
  editMenuItem,
  listMenuItems,
  deleteMenuItemController,
} from '../controllers/menuItemController.js'

const router = Router()

router.get('/', listMenuItems)
router.post('/', addMenuItem)
router.patch('/:id', editMenuItem)
router.delete('/:id', deleteMenuItemController)

export default router