import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import productModel from "../models/productModel.js";
import midtransClient from "midtrans-client";

// Helper function to check and subtract stock
const validateAndSubtractStock = async (items) => {
    for (const item of items) {
        const product = await productModel.findById(item._id);
        if (!product) throw new Error(`Product ${item.name} not found`);

        const size = item.size;
        const qty = item.quantity;

        if (!product.stock || product.stock[size] === undefined || product.stock[size] < qty) {
            throw new Error(`Insufficient stock for ${product.name} (Size: ${size})`);
        }

        product.stock[size] -= qty;
        product.markModified('stock');
        await product.save();
    }
}

const snap = new midtransClient.Snap({
    isProduction: false, // Ubah menjadi true jika menggunakan mode produksi
    serverKey: process.env.MIDTRANS_SERVER_KEY, // Ganti dengan Server Key dari Midtrans
});

const placeOrderOnline = async (req, res) => {
    try {
        const { userId, items, amount, address, shippingMethod } = req.body;

        // Check stock before proceeding
        await validateAndSubtractStock(items);

        const orderId = `order-${Date.now()}`;

        // Buat parameter transaksi Midtrans
        const parameter = {
            transaction_details: {
                order_id: orderId,
                gross_amount: amount, // Total pembayaran
            },
            customer_details: {
                first_name: "Customer", // Sesuaikan dengan data user
                email: "customer@example.com", // Ganti dengan email user
                phone: "08123456789", // Ganti dengan nomor telepon user
            },
        };

        // Dapatkan Snap Token
        const transaction = await snap.createTransaction(parameter);
        const snapToken = transaction.token;

        // Simpan data pesanan ke database
        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "Online",
            payment: false,
            shippingMethod: shippingMethod || "Standard",
            date: Date.now(),
            orderId,
        };

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        res.json({ success: true, snapToken, message: "Order Placed with Snap Token" });
    } catch (error) {
        console.error("Error creating transaction:", error);
        res.json({ success: false, message: error.message });
    }
};


// Placing Order using COD
const placeOrder = async (req, res) => {
    try {

        const { userId, items, amount, address, shippingMethod } = req.body;

        // Check stock before proceeding
        await validateAndSubtractStock(items);

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "COD",
            payment: false,
            shippingMethod: shippingMethod || "Standard",
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId, { cartData: {} })

        res.json({ success: true, message: "Order Placed" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// All orders data from admin panel
const allOrders = async (req, res) => {

    try {
        const orders = await orderModel.find({})
        res.json({ success: true, orders })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// All orders data from frontend
const userOrders = async (req, res) => {

    try {

        const { userId } = req.body

        const orders = await orderModel.find({ userId })
        res.json({ success: true, orders })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// Update orders status from admin panel
const updateStatus = async (req, res) => {
    try {

        const { orderId, status } = req.body
        await orderModel.findByIdAndUpdate(orderId, { status })
        res.json({ success: true, message: 'Status Updated' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export { placeOrderOnline, placeOrder, allOrders, userOrders, updateStatus }