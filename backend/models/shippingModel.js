import mongoose from "mongoose";

const shippingSchema = new mongoose.Schema({
    name: { type: String, required: true },
    fee: { type: Number, required: true },
    estimatedDays: { type: String, default: "" },
    isActive: { type: Boolean, default: true }
})

const shippingModel = mongoose.models.shipping || mongoose.model('shipping', shippingSchema)

export default shippingModel;
