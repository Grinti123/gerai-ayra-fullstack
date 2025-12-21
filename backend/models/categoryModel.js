import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String },
    image: { type: String },
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

const categoryModel = mongoose.models.category || mongoose.model("category", categorySchema);

export default categoryModel;
