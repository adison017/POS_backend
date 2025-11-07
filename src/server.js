import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import http from 'node:http'
import compression from 'compression'

import apiRouter from './routes/index.js'

dotenv.config()

const app = express()
const httpServer = http.createServer(app)
const PORT = process.env.PORT || 4000
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173'

app.use(compression())
app.use(cors({
  origin: FRONTEND_URL,
  credentials: true,
}))
app.use(express.json())

app.use('/api', apiRouter)

// ✅ เพิ่มตรงนี้
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: '🚀 POS Backend is running!',
    port: PORT,
    timestamp: new Date().toISOString(),
  })
})

// Error handler
app.use((err, _req, res, _next) => {
  console.error('[api:error]', err)
  const status = err.status || 500
  res.status(status).json({
    error: err.message || 'Internal Server Error',
    details: err.details, // optional supabase errors include details
  })
})

app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    path: req.originalUrl,
  })
})

// Socket.IO
import { Server as IOServer } from 'socket.io'
export const io = new IOServer(httpServer, {
  cors: {
    origin: FRONTEND_URL,
    credentials: true,
  },
})

io.on('connection', (socket) => {
  console.log('[socket] connected', socket.id)
  socket.on('disconnect', () => console.log('[socket] disconnected', socket.id))
})

httpServer.listen(PORT, () => {
  console.log(`Backend server listening on port ${PORT}`)
})
