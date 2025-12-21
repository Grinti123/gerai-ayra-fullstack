import shippingModel from "../models/shippingModel.js";

// Add shipping method
const addShipping = async (req, res) => {
    try {
        const { name, fee, estimatedDays } = req.body;
        const shippingData = new shippingModel({
            name,
            fee: Number(fee),
            estimatedDays
        })

        await shippingData.save();
        res.json({ success: true, message: "Shipping Method Added" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// List shipping methods
const listShipping = async (req, res) => {
    try {
        const shippingMethods = await shippingModel.find({});
        res.json({ success: true, shippingMethods });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// Update shipping method
const updateShipping = async (req, res) => {
    try {
        const { id, name, fee, estimatedDays, isActive } = req.body;
        await shippingModel.findByIdAndUpdate(id, {
            name,
            fee: Number(fee),
            estimatedDays,
            isActive
        });
        res.json({ success: true, message: "Shipping Method Updated" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// Remove shipping method
const removeShipping = async (req, res) => {
    try {
        await shippingModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Shipping Method Removed" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export { addShipping, listShipping, updateShipping, removeShipping }
