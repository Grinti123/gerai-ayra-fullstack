import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, set: v => Math.round(Number(v) * 100) / 100 },
    image: { type: Array },
    gender: { type: String },
    category: { type: String },
    sizes: { type: Array, required: true },
    stock: { type: Object, default: {} },
    bestseller: { type: Boolean, default: false },
    date: { type: Number, required: true }
}, { timestamps: true })

const productModel = mongoose.models.product || mongoose.model("product", productSchema);

export default productModel
