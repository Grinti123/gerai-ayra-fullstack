import express from 'express'
import { addCategory, listCategory, updateCategory, removeCategory } from '../controllers/categoryController.js'
import adminAuth from '../middleware/adminAuth.js'
import upload from '../middleware/multer.js'

const categoryRouter = express.Router()

categoryRouter.post('/add', adminAuth, upload.single('image'), addCategory)
categoryRouter.get('/list', listCategory) // Public so frontend can fetch categories
categoryRouter.post('/update', adminAuth, upload.single('image'), updateCategory)
categoryRouter.post('/remove', adminAuth, removeCategory)

export default categoryRouter
