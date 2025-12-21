import jwt from 'jsonwebtoken'
import userModel from '../models/userModel.js'

const adminAuth = async (req, res, next) => {
    try {
        const { token } = req.headers
        if (!token) {
            return res.json({ success: false, message: "Not Authorized Login Again" })
        }

        const token_decode = jwt.verify(token, process.env.JWT_SECRET);

        // 1. Check for legacy/master admin token
        if (token_decode === process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return next();
        }

        // 2. Check for database-based admin token
        if (token_decode.id) {
            const user = await userModel.findById(token_decode.id);
            if (user && (user.role === 'admin' || user.role === 'superadmin')) {
                return next();
            }
        }

        return res.json({ success: false, message: "Not Authorized Login Again" })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

export default adminAuth;