import mongoose from "mongoose";

const analyticsSchema = new mongoose.Schema({
    date: { type: String, required: true, unique: true }, // Format YYYY-MM-DD
    visitors: { type: Number, default: 0 },
    pageViews: { type: Number, default: 0 }
}, { timestamps: true });

const analyticsModel = mongoose.models.analytics || mongoose.model("analytics", analyticsSchema);

export default analyticsModel;
