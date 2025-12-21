import orderModel from "../models/orderModel.js";
import productModel from "../models/productModel.js";
import analyticsModel from "../models/analyticsModel.js";

const getAnalyticsData = async (req, res) => {
    try {
        // 1. Sales Report (Last 7 Days)
        const last7Days = [...Array(7)].map((_, i) => {
            const d = new Date();
            d.setDate(d.getDate() - i);
            return d.toISOString().split('T')[0];
        }).reverse();

        const salesData = [];
        const visitorData = [];

        for (const date of last7Days) {
            // Sales Logic
            // Start of day in ms
            const startOfDay = new Date(date).setHours(0, 0, 0, 0);
            const endOfDay = new Date(date).setHours(23, 59, 59, 999);

            const dayOrders = await orderModel.find({
                date: {
                    $gte: startOfDay,
                    $lte: endOfDay
                }
            });

            const totalSales = dayOrders.reduce((acc, order) => acc + order.amount, 0);
            const formattedDate = new Date(date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });

            salesData.push({
                name: formattedDate,
                sales: totalSales,
                orders: dayOrders.length
            });

            // Visitor Logic (Mocking random data if completely empty for demo purposes, or fetching real)
            // In a real app, you'd increment this model on every page load.
            let stats = await analyticsModel.findOne({ date });

            // DEMO ONLY: Generate random visitor data if none exists to populate the chart
            // Remove this '|| Math.floor...' in production
            const count = stats ? stats.visitors : Math.floor(Math.random() * 50) + 10;

            visitorData.push({
                name: formattedDate,
                visitors: count
            });
        }

        // 2. Top Products
        const allOrders = await orderModel.find({});
        const productCounts = {};

        allOrders.forEach(order => {
            order.items.forEach(item => {
                const productName = item.name.length > 15 ? item.name.substring(0, 15) + '...' : item.name;
                if (productCounts[productName]) {
                    productCounts[productName] += item.quantity;
                } else {
                    productCounts[productName] = item.quantity;
                }
            })
        });

        const topProducts = Object.entries(productCounts)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 5)
            .map(([name, count]) => ({ name, count }));

        // 3. Summary
        const totalProfitRes = allOrders.reduce((acc, order) => acc + order.amount, 0);

        res.json({
            success: true,
            salesData,
            visitorData,
            topProducts,
            summary: {
                totalRevenue: totalProfitRes,
                totalOrders: allOrders.length,
                totalProducts: await productModel.countDocuments({})
            }
        });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export { getAnalyticsData };
