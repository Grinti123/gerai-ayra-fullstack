import express from 'express'
import { loginUser, registerUser, adminLogin, getUserProfile, updateUserProfile, changePassword, getAllUsers, removeUser, updateUser, addUser } from '../controllers/userController.js'
import authUser from '../middleware/auth.js'
import adminAuth from '../middleware/adminAuth.js'

const userRouter = express.Router();

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.post('/admin', adminLogin)
userRouter.post('/profile', authUser, getUserProfile)
userRouter.post('/update-profile', authUser, updateUserProfile)
userRouter.post('/change-password', authUser, changePassword)
userRouter.get('/list', adminAuth, getAllUsers)
userRouter.post('/remove', adminAuth, removeUser)
userRouter.post('/update', adminAuth, updateUser)
userRouter.post('/add', adminAuth, addUser)

export default userRouter;
