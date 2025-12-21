import express from 'express';
import { addPayment, listPayment, updatePayment, removePayment } from '../controllers/paymentController.js';
import adminAuth from '../middleware/adminAuth.js';

const paymentRouter = express.Router();

paymentRouter.post('/add', adminAuth, addPayment);
paymentRouter.get('/list', listPayment); // Public can see active ones, but controller currently returns all. 
paymentRouter.post('/update', adminAuth, updatePayment);
paymentRouter.post('/remove', adminAuth, removePayment);

export default paymentRouter;
