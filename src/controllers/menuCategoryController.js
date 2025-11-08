import {
  createMenuCategory,
  findActiveMenuCategories,
  findAllMenuCategories,
  updateMenuCategory,
} from '../models/menuCategoryModel.js'

export const listMenuCategories = async (req, res, next) => {
  try {
    // Check if we want all categories (for admin) or just active ones (for POS)
    const showAll = req.query.showAll === 'true';
    
    const categories = showAll 
      ? await findAllMenuCategories() 
      : await findActiveMenuCategories();
      
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