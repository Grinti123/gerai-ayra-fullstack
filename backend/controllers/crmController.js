import leadModel from '../models/leadModel.js'
import interactionModel from '../models/interactionModel.js'
import userModel from '../models/userModel.js'
import orderModel from '../models/orderModel.js'

// --- Leads Management ---

const addLead = async (req, res) => {
    try {
        const { name, email, phone, source, status, notes } = req.body;
        const lead = new leadModel({ name, email, phone, source, status, notes });
        await lead.save();
        res.json({ success: true, message: "Lead Added" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

const listLeads = async (req, res) => {
    try {
        const leads = await leadModel.find({}).sort({ createdAt: -1 });
        res.json({ success: true, leads });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

const updateLeadStatus = async (req, res) => {
    try {
        const { id, status } = req.body;
        await leadModel.findByIdAndUpdate(id, { status });
        res.json({ success: true, message: "Lead Status Updated" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

const removeLead = async (req, res) => {
    try {
        await leadModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Lead Removed" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// --- Interactions ---

const addInteraction = async (req, res) => {
    try {
        const { referenceId, referenceType, type, notes, date } = req.body;
        const interaction = new interactionModel({
            referenceId,
            referenceType,
            type,
            notes,
            date: date || Date.now()
        });
        await interaction.save();
        res.json({ success: true, message: "Interaction Logged" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

const listInteractions = async (req, res) => {
    try {
        const interactions = await interactionModel.find({}).sort({ date: -1 });
        res.json({ success: true, interactions });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// --- Analytics / Dashboard Data ---

const getCRMStats = async (req, res) => {
    try {
        const totalLeads = await leadModel.countDocuments({});
        const newLeads = await leadModel.countDocuments({ status: 'New' });
        const convertedLeads = await leadModel.countDocuments({ status: 'Converted' });

        // Customer Analysis (Top Customers by Revenue)
        // This is a bit heavy, in production optimize this with aggregation
        const orders = await orderModel.find({});
        const userSpending = {};

        orders.forEach(order => {
            if (!userSpending[order.userId]) userSpending[order.userId] = 0;
            userSpending[order.userId] += order.amount;
        });

        // Get Top 5 IDs
        const topUserIds = Object.entries(userSpending)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 5)
            .map(([id]) => id);

        const topCustomers = await userModel.find({ _id: { $in: topUserIds } });

        const topCustomersData = topCustomers.map(user => ({
            _id: user._id,
            name: user.name,
            email: user.email,
            totalSpent: userSpending[user._id] || 0
        })).sort((a, b) => b.totalSpent - a.totalSpent);

        res.json({
            success: true,
            stats: {
                totalLeads,
                newLeads,
                convertedLeads,
                conversionRate: totalLeads ? ((convertedLeads / totalLeads) * 100).toFixed(1) : 0
            },
            topCustomers: topCustomersData
        });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export {
    addLead, listLeads, updateLeadStatus, removeLead,
    addInteraction, listInteractions,
    getCRMStats
}
