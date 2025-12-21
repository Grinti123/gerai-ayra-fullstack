import expenseModel from '../models/expenseModel.js'

// Add Expense
const addExpense = async (req, res) => {
    try {
        const { title, amount, category, description, date } = req.body;

        const expenseData = {
            title,
            amount: Number(amount),
            category,
            description,
            date: date || Date.now()
        }

        const expense = new expenseModel(expenseData);
        await expense.save();

        res.json({ success: true, message: "Expense Added" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// List Expenses
const listExpense = async (req, res) => {
    try {
        const expenses = await expenseModel.find({}).sort({ date: -1 });
        res.json({ success: true, expenses });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// Remove Expense
const removeExpense = async (req, res) => {
    try {
        await expenseModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Expense Removed" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// Get Financial Summary (Revenue vs Expenses)
const getFinancialSummary = async (req, res) => {
    try {
        // This will be handled more comprehensively in the frontend or a dedicated stats endpoint
        // But we can provide the basic raw data here if needed.
        // For now, list handles the raw items.
    } catch (error) {
        console.log(error);
    }
}

export { addExpense, listExpense, removeExpense }
