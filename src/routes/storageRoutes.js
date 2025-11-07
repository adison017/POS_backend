import { Router } from 'express'
import multer from 'multer'

import { deleteFile, uploadFile } from '../controllers/storageController.js'

const router = Router()

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: Number(process.env.FILE_UPLOAD_MAX_SIZE ?? 5 * 1024 * 1024),
  },
})

router.post('/upload', upload.single('file'), uploadFile)
router.post('/delete', deleteFile)

export default router

