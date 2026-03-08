import * as TableModel from '../models/tableModel.js'

export const getTables = async (req, res, next) => {
    try {
        const tables = await TableModel.getAllTables()
        res.json(tables)
    } catch (error) {
        next(error)
    }
}

export const createTable = async (req, res, next) => {
    try {
        const tableData = {
            ...req.body,
            // If no ID provided, generate one or let DB handle it (if auto-gen). 
            // Our model expects ID to be passed or auto-gen. 
            // Assuming frontend generates ID or we generate here.
            // Let's generate if missing for consistency.
            id: req.body.id || `table_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        }
        const newTable = await TableModel.createTable(tableData)
        res.status(201).json(newTable)
    } catch (error) {
        next(error)
    }
}

export const updateTable = async (req, res, next) => {
    try {
        const { id } = req.params
        const updatedTable = await TableModel.updateTable(id, req.body)
        if (!updatedTable) {
            return res.status(404).json({ error: 'Table not found' })
        }
        res.json(updatedTable)
    } catch (error) {
        next(error)
    }
}

export const deleteTable = async (req, res, next) => {
    try {
        const { id } = req.params
        await TableModel.deleteTable(id)
        res.json({ message: 'Table deleted successfully', id })
    } catch (error) {
        next(error)
    }
}
