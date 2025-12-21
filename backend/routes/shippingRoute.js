import express from 'express'
import { addShipping, listShipping, updateShipping, removeShipping } from '../controllers/shippingController.js'
import adminAuth from '../middleware/adminAuth.js'

const shippingRouter = express.Router();

shippingRouter.post('/add', adminAuth, addShipping)
shippingRouter.get('/list', listShipping) // Public can see list too if needed in frontend
shippingRouter.post('/update', adminAuth, updateShipping)
shippingRouter.post('/remove', adminAuth, removeShipping)

export default shippingRouter;
