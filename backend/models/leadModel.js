import mongoose from "mongoose";

const leadSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    source: { type: String, default: 'Website' }, // e.g. Instagram, Website, Referral
    status: { type: String, default: 'New' }, // New, Contacted, Qualified, Lost, Converted
    notes: { type: String }
}, { timestamps: true });

const leadModel = mongoose.models.lead || mongoose.model("lead", leadSchema);

export default leadModel;
