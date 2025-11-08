import { Router } from 'express'
import {
  addMenuCategory,
  editMenuCategory,
  listMenuCategories,
  deleteMenuCategoryController,
} from '../controllers/menuCategoryController.js'

const router = Router()

router.get('/', listMenuCategories)
router.post('/', addMenuCategory)
router.patch('/:id', editMenuCategory)
router.delete('/:id', deleteMenuCategoryController)

export default router