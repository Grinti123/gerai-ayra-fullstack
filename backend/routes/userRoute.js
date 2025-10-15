import express from 'express'
import { loginUser, registerUser, adminLogin, getUserProfile, updateUserProfile, changePassword, getAllUsers } from '../controllers/userController.js'
import authUser from '../middleware/auth.js'

const userRouter = express.Router();

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.post('/admin', adminLogin)
userRouter.post('/profile', authUser, getUserProfile)
userRouter.post('/update-profile', authUser, updateUserProfile)
userRouter.post('/change-password', authUser, changePassword)
userRouter.post('/all', authUser, getAllUsers)
userRouter.get('/all-users', authUser, getAllUsers)

export default userRouter;
