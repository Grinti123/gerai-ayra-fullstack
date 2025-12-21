import express from 'express'
import { getAnalyticsData } from '../controllers/analyticsController.js'
import adminAuth from '../middleware/adminAuth.js'

const analyticsRouter = express.Router();

analyticsRouter.get('/dashboard', adminAuth, getAnalyticsData);

export default analyticsRouter;
