import voucherModel from "../models/voucherModel.js";

// Apply voucher to cart
const applyVoucher = async (req, res) => {
    try {
        const { code, cartAmount } = req.body;

        if (!code || !cartAmount) {
            return res.json({ success: false, message: "Missing required fields" });
        }

        // Find voucher
        const voucher = await voucherModel.findOne({
            code: code.toUpperCase(),
            isActive: true
        });

        if (!voucher) {
            return res.json({ success: false, message: "Invalid voucher code" });
        }

        // Check validity period
        const now = new Date();
        if (now < voucher.validFrom || now > voucher.validUntil) {
            return res.json({ success: false, message: "Voucher has expired or not yet valid" });
        }

        // Check usage limit
        if (voucher.usageLimit && voucher.usedCount >= voucher.usageLimit) {
            return res.json({ success: false, message: "Voucher usage limit reached" });
        }

        // Check minimum purchase
        if (cartAmount < voucher.minPurchase) {
            return res.json({
                success: false,
                message: `Minimum purchase of Rp.${voucher.minPurchase} required`
            });
        }

        // Calculate discount
        let discountAmount = 0;
        if (voucher.discountType === 'percentage') {
            discountAmount = (cartAmount * voucher.discountValue) / 100;
            // Apply max discount if set
            if (voucher.maxDiscount && discountAmount > voucher.maxDiscount) {
                discountAmount = voucher.maxDiscount;
            }
        } else {
            discountAmount = voucher.discountValue;
        }

        // Ensure discount doesn't exceed cart amount
        discountAmount = Math.min(discountAmount, cartAmount);

        res.json({
            success: true,
            message: "Voucher applied successfully",
            voucher: {
                code: voucher.code,
                description: voucher.description,
                discountType: voucher.discountType,
                discountValue: voucher.discountValue,
                discountAmount: Math.round(discountAmount)
            }
        });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Mark voucher as used (call this after successful order)
const useVoucher = async (req, res) => {
    try {
        const { code } = req.body;

        const voucher = await voucherModel.findOne({ code: code.toUpperCase() });

        if (!voucher) {
            return res.json({ success: false, message: "Voucher not found" });
        }

        voucher.usedCount += 1;
        await voucher.save();

        res.json({ success: true, message: "Voucher usage recorded" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Get all active vouchers (for display)
const listVouchers = async (req, res) => {
    try {
        const now = new Date();
        const vouchers = await voucherModel.find({
            isActive: true,
            validFrom: { $lte: now },
            validUntil: { $gte: now }
        }).select('-__v');

        res.json({ success: true, vouchers });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Admin: Create voucher
const createVoucher = async (req, res) => {
    try {
        const {
            code,
            description,
            discountType,
            discountValue,
            minPurchase,
            maxDiscount,
            usageLimit,
            validFrom,
            validUntil,
            applicableProducts,
            applicableCategories
        } = req.body;

        // Validate required fields
        if (!code || !description || !discountType || !discountValue || !validFrom || !validUntil) {
            return res.json({ success: false, message: "Missing required fields" });
        }

        // Check if code already exists
        const existingVoucher = await voucherModel.findOne({ code: code.toUpperCase() });
        if (existingVoucher) {
            return res.json({ success: false, message: "Voucher code already exists" });
        }

        const voucherData = {
            code: code.toUpperCase(),
            description,
            discountType,
            discountValue,
            minPurchase: minPurchase || 0,
            maxDiscount: maxDiscount || null,
            usageLimit: usageLimit || null,
            validFrom: new Date(validFrom),
            validUntil: new Date(validUntil),
            applicableProducts: applicableProducts || [],
            applicableCategories: applicableCategories || []
        };

        const voucher = new voucherModel(voucherData);
        await voucher.save();

        res.json({ success: true, message: "Voucher created successfully", voucher });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Admin: Update voucher
const updateVoucher = async (req, res) => {
    try {
        const { id } = req.body;

        const voucher = await voucherModel.findByIdAndUpdate(id, req.body, { new: true });

        if (!voucher) {
            return res.json({ success: false, message: "Voucher not found" });
        }

        res.json({ success: true, message: "Voucher updated successfully", voucher });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Admin: Delete voucher
const deleteVoucher = async (req, res) => {
    try {
        const { id } = req.body;

        await voucherModel.findByIdAndDelete(id);

        res.json({ success: true, message: "Voucher deleted successfully" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Admin: Get all vouchers
const getAllVouchers = async (req, res) => {
    try {
        const vouchers = await voucherModel.find({}).sort({ createdAt: -1 });
        res.json({ success: true, vouchers });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export {
    applyVoucher,
    useVoucher,
    listVouchers,
    createVoucher,
    updateVoucher,
    deleteVoucher,
    getAllVouchers
};
