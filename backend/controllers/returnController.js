import returnModel from "../models/returnModel.js";
import orderModel from "../models/orderModel.js";
import { v2 as cloudinary } from 'cloudinary';

// Apply for Return/Exchange (User)
const applyReturn = async (req, res) => {
    try {
        const { userId, orderId, items, type, reason } = req.body;
        const images = req.files;

        // Check if order exists
        const order = await orderModel.findById(orderId);
        if (!order) {
            return res.json({ success: false, message: "Order not found" });
        }

        // Upload images to Cloudinary if any
        let imagesUrl = [];
        if (images && images.length > 0) {
            imagesUrl = await Promise.all(
                images.map(async (item) => {
                    let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                    return result.secure_url;
                })
            );
        }

        const returnData = {
            userId,
            orderId,
            items: JSON.parse(items),
            type,
            reason,
            images: imagesUrl,
            date: Date.now()
        };

        const newReturn = new returnModel(returnData);
        await newReturn.save();

        res.json({ success: true, message: "Request submitted successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Get user's return requests
const userReturns = async (req, res) => {
    try {
        const { userId } = req.body;
        const returns = await returnModel.find({ userId }).sort({ date: -1 });
        res.json({ success: true, returns });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Admin: List all return requests
const listReturns = async (req, res) => {
    try {
        const returns = await returnModel.find({}).sort({ date: -1 });
        res.json({ success: true, returns });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Admin: Update return status
const updateReturnStatus = async (req, res) => {
    try {
        const { returnId, status, adminComment } = req.body;
        await returnModel.findByIdAndUpdate(returnId, { status, adminComment });
        res.json({ success: true, message: "Status updated" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export { applyReturn, userReturns, listReturns, updateReturnStatus };
