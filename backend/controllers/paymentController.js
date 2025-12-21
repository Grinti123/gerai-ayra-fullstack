import paymentModel from "../models/paymentModel.js";

// Add payment method
const addPayment = async (req, res) => {
    try {
        const { name, description, type, details } = req.body;
        const paymentData = new paymentModel({
            name,
            description,
            type,
            details
        })

        await paymentData.save();
        res.json({ success: true, message: "Payment Method Added" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// List payment methods
const listPayment = async (req, res) => {
    try {
        const paymentMethods = await paymentModel.find({});
        res.json({ success: true, paymentMethods });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// Update payment method
const updatePayment = async (req, res) => {
    try {
        const { id, name, description, type, details, isActive } = req.body;
        await paymentModel.findByIdAndUpdate(id, {
            name,
            description,
            type,
            details,
            isActive
        });
        res.json({ success: true, message: "Payment Method Updated" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// Remove payment method
const removePayment = async (req, res) => {
    try {
        await paymentModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Payment Method Removed" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export { addPayment, listPayment, updatePayment, removePayment }
