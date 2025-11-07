import { Router } from 'express'
import {
  addMenuItem,
  editMenuItem,
  listMenuItems,
} from '../controllers/menuItemController.js'

const router = Router()

router.get('/', listMenuItems)
router.post('/', addMenuItem)
router.patch('/:id', editMenuItem)

export default router

