import { randomUUID } from 'node:crypto'
import path from 'node:path'

import supabase from '../lib/supabaseClient.js'

const STORAGE_BUCKET = process.env.SUPABASE_STORAGE_BUCKET || 'POS'

export const uploadFile = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'File is required' })
    }

    const folder = req.body.folder?.trim() || 'uploads'
    const extension = path.extname(req.file.originalname) || ''
    const filename = `${folder.replace(/\s+/g, '_')}/${Date.now()}-${randomUUID()}${extension}`

    const { data, error } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(filename, req.file.buffer, {
        cacheControl: '3600',
        upsert: false,
        contentType: req.file.mimetype,
      })

    if (error) throw error

    const {
      data: { publicUrl },
    } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(filename)

    return res.status(201).json({
      path: data?.path ?? filename,
      publicUrl,
      size: req.file.size,
      mimeType: req.file.mimetype,
      originalName: req.file.originalname,
    })
  } catch (error) {
    return next(error)
  }
}

export const deleteFile = async (req, res, next) => {
  try {
    const filePath = req.body?.path

    if (!filePath) {
      return res.status(400).json({ error: 'path is required' })
    }

    const { error } = await supabase.storage
      .from(STORAGE_BUCKET)
      .remove([filePath])

    if (error) throw error

    return res.status(204).send()
  } catch (error) {
    return next(error)
  }
}

