import mongoose from "mongoose";

const voucherSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true, uppercase: true },
    description: { type: String, required: true },
    discountType: { type: String, enum: ['percentage', 'fixed'], required: true },
    discountValue: { type: Number, required: true },
    minPurchase: { type: Number, default: 0 },
    maxDiscount: { type: Number, default: null }, // For percentage discounts
    usageLimit: { type: Number, default: null }, // null = unlimited
    usedCount: { type: Number, default: 0 },
    validFrom: { type: Date, required: true },
    validUntil: { type: Date, required: true },
    isActive: { type: Boolean, default: true },
    applicableProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'product' }], // Empty = all products
    applicableCategories: [{ type: String }], // Empty = all categories
}, { timestamps: true });

const voucherModel = mongoose.models.voucher || mongoose.model('voucher', voucherSchema);

export default voucherModel;
