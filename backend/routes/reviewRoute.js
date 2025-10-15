import express from 'express';
import { addReview, getProductReviews, deleteReview, updateReview, getAllReviews } from '../controllers/reviewController.js';
import authUser from '../middleware/auth.js';

const reviewRouter = express.Router();

reviewRouter.post('/add', authUser, addReview);
reviewRouter.post('/get', getProductReviews);
reviewRouter.post('/delete', authUser, deleteReview);
reviewRouter.post('/update', authUser, updateReview);
reviewRouter.get('/all', authUser, getAllReviews);

export default reviewRouter;
