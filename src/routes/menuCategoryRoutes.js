import { Router } from 'express'
import {
  addMenuCategory,
  editMenuCategory,
  listMenuCategories,
} from '../controllers/menuCategoryController.js'

const router = Router()

router.get('/', listMenuCategories)
router.post('/', addMenuCategory)
router.patch('/:id', editMenuCategory)

export default router

