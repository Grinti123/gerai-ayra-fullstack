import express from 'express'
import { placeOrder, allOrders, userOrders, updateStatus, placeOrderOnline } from '../controllers/orderController.js'
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'

const orderRouter = express.Router()

// Admin Features
orderRouter.post('/list', adminAuth, allOrders)
orderRouter.post('/status', adminAuth, updateStatus)
orderRouter.post('/customer-orders', adminAuth, userOrders)

// Payment Features
orderRouter.post('/place', authUser, placeOrder)
orderRouter.post('/online', authUser, placeOrderOnline)

// User Feature
orderRouter.post('/userorders', authUser, userOrders)

export default orderRouter