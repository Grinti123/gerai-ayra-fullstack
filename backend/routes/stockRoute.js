import express from 'express'
import { getStockList, updateStock } from '../controllers/stockController.js'
import adminAuth from '../middleware/adminAuth.js'

const stockRouter = express.Router()

stockRouter.get('/list', adminAuth, getStockList)
stockRouter.post('/update', adminAuth, updateStock)

export default stockRouter
