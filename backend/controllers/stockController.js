import productModel from "../models/productModel.js";

// Get all products with stock info
const getStockList = async (req, res) => {
    try {
        const products = await productModel.find({}, 'name sizes stock image category');
        res.json({ success: true, products });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// Update stock (Batch update for multiple sizes)
const updateStock = async (req, res) => {
    try {
        const { productId, stockData } = req.body;

        if (!productId || !stockData) {
            return res.json({ success: false, message: "Missing required fields" });
        }

        const product = await productModel.findById(productId);
        if (!product) {
            return res.json({ success: false, message: "Product not found" });
        }

        // Merge updates into current stock
        const updatedStock = { ...(product.stock || {}) };

        Object.keys(stockData).forEach(size => {
            const val = Number(stockData[size]);
            if (!isNaN(val)) {
                updatedStock[size] = val;
            }
        });

        // Use findByIdAndUpdate to bypass versioning and ensure persistence of Mixed types
        await productModel.findByIdAndUpdate(productId, { $set: { stock: updatedStock } });

        res.json({ success: true, message: "Stock Updated Successfully" });
    } catch (error) {
        console.log("Stock update error:", error);
        res.json({ success: false, message: error.message });
    }
}

export { getStockList, updateStock };
