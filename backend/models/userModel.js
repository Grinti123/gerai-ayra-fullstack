import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, default: "" },
    address: {
        line1: { type: String, default: "" },
        line2: { type: String, default: "" },
        city: { type: String, default: "" },
        province: { type: String, default: "" },
        zipcode: { type: String, default: "" }
    },
    cartData: { type: Object, default: {} },
    wishlistData: { type: Object, default: {} },
    role: { type: String, default: "user", enum: ["user", "admin", "superadmin"] },
    permissions: { type: [String], default: [] }
}, { minimize: false })

const userModel = mongoose.models.user || mongoose.model('user', userSchema)

export default userModel