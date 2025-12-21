import express from 'express'
import { getSettings, updateSettings } from '../controllers/settingController.js'
import adminAuth from '../middleware/adminAuth.js'
import upload from '../middleware/multer.js'

const settingRouter = express.Router();

settingRouter.get('/get', getSettings);
settingRouter.post('/update', adminAuth, upload.fields([{ name: 'logo', maxCount: 1 }, { name: 'favicon', maxCount: 1 }]), updateSettings);

export default settingRouter;
