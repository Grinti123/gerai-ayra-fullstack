import mongoose from "mongoose";

const returnSchema = new mongoose.Schema({
    orderId: { type: String, required: true },
    userId: { type: String, required: true },
    items: { type: Array, required: true },
    type: { type: String, enum: ['Return', 'Exchange'], required: true },
    reason: { type: String, required: true },
    images: { type: Array, default: [] },
    status: { type: String, default: 'Pending', enum: ['Pending', 'Approved', 'Rejected', 'Received', 'Completed'] },
    adminComment: { type: String, default: "" },
    date: { type: Number, required: true }
}, { timestamps: true });

const returnModel = mongoose.models.return || mongoose.model("return", returnSchema);

export default returnModel;
