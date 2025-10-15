import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import userModel from "../models/userModel.js";


const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET)
}

// Route for user Login
const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await userModel.findOne({email});
        
        if (!user) {
            return res.json({success:false, message:"User doesn't exists"})
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            
            const token = createToken(user._id)
            res.json({success:true, token})

        }

        else {
            res.json({success:false, message: 'Invalid Credentials'})
        }
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}

// Route for user Register
const registerUser = async (req, res) => {
    try {
        const {name, email, password} = req.body;

        // Checking user already exist or not
        const exist = await userModel.findOne({email})
        if (exist) {
            return res.json({success:false, message:"User already exist"})
        }

        // validating email format & strong password
        if (!validator.isEmail(email)) {
            return res.json({success:false, message:"Please enter a valid email"})
        }
        if (password.length < 8) {
            return res.json({success:false, message:"Please enter a strong password"})
        }

        // Hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({
            name,
            email,
            password:hashedPassword
        })

        const user = await newUser.save()

        const token = createToken(user._id)

        res.json({success:true, token})

    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}

// Route for admin Login
const adminLogin = async (req, res) => {
    try {

        const {email, password} = req.body

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email+password, process.env.JWT_SECRET);
            res.json({success:true, token})
        }
        else {
            console.log(error);
            res.json({success:false, message:"Invalid Credentials"})
        }

    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}

// Get user profile data
const getUserProfile = async (req, res) => {
    try {
        const userId = req.body.userId;
        const user = await userModel.findById(userId).select('-password');

        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        res.json({ success: true, userData: user });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Update user profile
const updateUserProfile = async (req, res) => {
    try {
        const userId = req.body.userId;
        const { name, phone, address } = req.body;

        const updateData = {};
        if (name) updateData.name = name;
        if (phone) updateData.phone = phone;
        if (address) updateData.address = address;

        const user = await userModel.findByIdAndUpdate(
            userId,
            updateData,
            { new: true }
        ).select('-password');

        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        res.json({ success: true, userData: user, message: "Profile updated successfully" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Change user password
const changePassword = async (req, res) => {
    try {
        const userId = req.body.userId;
        const { currentPassword, newPassword } = req.body;

        const user = await userModel.findById(userId);
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
        if (!isCurrentPasswordValid) {
            return res.json({ success: false, message: "Current password is incorrect" });
        }

        if (newPassword.length < 6) {
            return res.json({ success: false, message: "Password must be at least 6 characters long" });
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        const hashedNewPassword = await bcrypt.hash(newPassword, salt);

        // Update user with new password
        await userModel.findByIdAndUpdate(userId, { password: hashedNewPassword });

        res.json({ success: true, message: "Password changed successfully" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Get all users (admin only)
const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find({}).select('-password');
        res.json({ success: true, users: users.length });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export { loginUser, registerUser, adminLogin, getUserProfile, updateUserProfile, changePassword, getAllUsers }
