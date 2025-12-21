
import mongoose from 'mongoose';
import 'dotenv/config'; // This loads .env
import connectDB from './config/mongodb.js';
import voucherModel from './models/voucherModel.js';
import sampleVouchers from './sampleVouchers.js';

const seedVouchers = async () => {
    try {
        await connectDB();

        console.log("Connected to DB...");

        // Clear existing vouchers to avoid duplicates/errors
        // await voucherModel.deleteMany({}); 
        // console.log("Cleared existing vouchers...");

        for (const voucher of sampleVouchers) {
            // Check if exists
            const exists = await voucherModel.findOne({ code: voucher.code });
            if (!exists) {
                await voucherModel.create(voucher);
                console.log(`Created voucher: ${voucher.code}`);
            } else {
                console.log(`Voucher ${voucher.code} already exists.`);
            }
        }

        console.log("Seeding complete.");
        process.exit(0);
    } catch (error) {
        console.error("Seeding failed:", error);
        process.exit(1);
    }
};

seedVouchers();
