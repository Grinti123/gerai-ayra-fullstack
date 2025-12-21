import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'
import reviewRouter from './routes/reviewRoute.js'
import voucherRouter from './routes/voucherRoute.js'
import wishlistRouter from './routes/wishlistRoute.js'
import shippingRouter from './routes/shippingRoute.js'
import paymentRouter from './routes/paymentRoute.js'
import stockRouter from './routes/stockRoute.js'
import categoryRouter from './routes/categoryRoute.js'
import returnRouter from './routes/returnRoute.js'
import settingRouter from './routes/settingRoute.js'
import expenseRouter from './routes/expenseRoute.js'
import crmRouter from './routes/crmRoute.js'
import analyticsRouter from './routes/analyticsRoute.js'

// App Config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

// Middlewares
app.use(express.json())
app.use(cors());

// API Endpoints
app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/orders', orderRouter)
app.use('/api/cart', cartRouter)
app.use('/api/review', reviewRouter)
app.use('/api/voucher', voucherRouter)
app.use('/api/wishlist', wishlistRouter)
app.use('/api/shipping', shippingRouter)
app.use('/api/payment', paymentRouter)
app.use('/api/stock', stockRouter)
app.use('/api/category', categoryRouter)
app.use('/api/return', returnRouter)
app.use('/api/setting', settingRouter)
app.use('/api/expense', expenseRouter)
app.use('/api/crm', crmRouter)
app.use('/api/analytics', analyticsRouter)

app.get('/', (req, res) => {
    res.send("API Working")
})

app.listen(port, () => console.log('Server Started on PORT : ' + port));
