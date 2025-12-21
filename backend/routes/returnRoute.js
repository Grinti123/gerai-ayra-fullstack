import express from 'express';
import { applyReturn, userReturns, listReturns, updateReturnStatus } from '../controllers/returnController.js';
import authUser from '../middleware/auth.js';
import adminAuth from '../middleware/adminAuth.js';
import upload from '../middleware/multer.js';

const returnRouter = express.Router();

returnRouter.post('/apply', authUser, upload.array('images', 5), applyReturn);
returnRouter.post('/user-returns', authUser, userReturns);
returnRouter.get('/list', adminAuth, listReturns);
returnRouter.post('/update-status', adminAuth, updateReturnStatus);

export default returnRouter;
