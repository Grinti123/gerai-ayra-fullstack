import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, default: "" },
    type: { type: String, enum: ['manual', 'automatic', 'cod'], default: 'manual' },
    details: { type: String, default: "" }, // e.g., Bank Account Number or instructions
    isActive: { type: Boolean, default: true }
})

const paymentModel = mongoose.models.payment || mongoose.model('payment', paymentSchema)

export default paymentModel;
