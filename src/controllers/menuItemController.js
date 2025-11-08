import {
  createMenuItem,
  findActiveMenuItems,
  findAllMenuItems,
  updateMenuItem,
  deleteMenuItem,
} from '../models/menuItemModel.js'

export const listMenuItems = async (req, res, next) => {
  try {
    // Check if we want all items (for admin) or just active ones (for POS)
    const showAll = req.query.showAll === 'true';
    
    const items = showAll 
      ? await findAllMenuItems() 
      : await findActiveMenuItems();
      
    res.json(items)
  } catch (error) {
    next(error)
  }
}

export const addMenuItem = async (req, res, next) => {
  try {
    const newItem = await createMenuItem(req.body)
    res.status(201).json(newItem)
  } catch (error) {
    next(error)
  }
}

export const editMenuItem = async (req, res, next) => {
  try {
    const updatedItem = await updateMenuItem(req.params.id, req.body)
    res.json(updatedItem)
  } catch (error) {
    next(error)
  }
}

// Add delete controller function
export const deleteMenuItemController = async (req, res, next) => {
  try {
    await deleteMenuItem(req.params.id)
    res.status(204).send()
  } catch (error) {
    next(error)
  }
}