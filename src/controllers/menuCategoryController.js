import {
  createMenuCategory,
  findActiveMenuCategories,
  updateMenuCategory,
} from '../models/menuCategoryModel.js'

export const listMenuCategories = async (_req, res, next) => {
  try {
    const categories = await findActiveMenuCategories()
    res.json(categories)
  } catch (error) {
    next(error)
  }
}

export const addMenuCategory = async (req, res, next) => {
  try {
    const newCategory = await createMenuCategory(req.body)
    res.status(201).json(newCategory)
  } catch (error) {
    next(error)
  }
}

export const editMenuCategory = async (req, res, next) => {
  try {
    const updatedCategory = await updateMenuCategory(req.params.id, req.body)
    res.json(updatedCategory)
  } catch (error) {
    next(error)
  }
}

