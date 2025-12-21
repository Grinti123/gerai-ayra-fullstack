import express from 'express';
import {
    applyVoucher,
    useVoucher,
    listVouchers,
    createVoucher,
    updateVoucher,
    deleteVoucher,
    getAllVouchers
} from '../controllers/voucherController.js';
import adminAuth from '../middleware/adminAuth.js';

const voucherRouter = express.Router();

// Public routes
voucherRouter.post('/apply', applyVoucher);
voucherRouter.get('/list', listVouchers);
voucherRouter.post('/use', useVoucher);

// Admin routes
voucherRouter.post('/create', adminAuth, createVoucher);
voucherRouter.post('/update', adminAuth, updateVoucher);
voucherRouter.post('/delete', adminAuth, deleteVoucher);
voucherRouter.get('/all', adminAuth, getAllVouchers);

export default voucherRouter;
