import mongoose from "mongoose";

const interactionSchema = new mongoose.Schema({
    referenceId: { type: String, required: true }, // User ID or Lead ID
    referenceType: { type: String, required: true, enum: ['User', 'Lead'] },
    type: { type: String, required: true }, // Call, Email, Meeting, Note, WhatsApp
    notes: { type: String, required: true },
    date: { type: Number, required: true }
}, { timestamps: true });

const interactionModel = mongoose.models.interaction || mongoose.model("interaction", interactionSchema);

export default interactionModel;
