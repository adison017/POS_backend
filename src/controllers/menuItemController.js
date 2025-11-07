import {
  createMenuItem,
  findActiveMenuItems,
  updateMenuItem,
} from '../models/menuItemModel.js'

export const listMenuItems = async (_req, res, next) => {
  try {
    const items = await findActiveMenuItems()
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

