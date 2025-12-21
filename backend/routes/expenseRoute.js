import express from 'express'
import { addExpense, listExpense, removeExpense } from '../controllers/expenseController.js'
import adminAuth from '../middleware/adminAuth.js'

const expenseRouter = express.Router();

expenseRouter.post('/add', adminAuth, addExpense);
expenseRouter.get('/list', adminAuth, listExpense);
expenseRouter.post('/remove', adminAuth, removeExpense);

export default expenseRouter;
