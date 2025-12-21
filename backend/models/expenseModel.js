import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    amount: { type: Number, required: true },
    category: { type: String, required: true }, // e.g., 'Operational', 'Marketing', 'Stock Purchase', etc.
    description: { type: String },
    date: { type: Number, required: true }, // Timestamp
}, { timestamps: true });

const expenseModel = mongoose.models.expense || mongoose.model("expense", expenseSchema);

export default expenseModel;
