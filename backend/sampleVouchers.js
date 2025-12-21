// Sample vouchers to seed the database
// You can run this script or use the admin panel to create vouchers

const sampleVouchers = [
    {
        code: "WELCOME10",
        description: "Welcome discount for new customers - 10% off",
        discountType: "percentage",
        discountValue: 10,
        minPurchase: 100000,
        maxDiscount: 50000,
        usageLimit: 100,
        validFrom: new Date(),
        validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        isActive: true
    },
    {
        code: "SAVE50K",
        description: "Fixed discount Rp.50,000 for purchases above Rp.500,000",
        discountType: "fixed",
        discountValue: 50000,
        minPurchase: 500000,
        maxDiscount: null,
        usageLimit: 50,
        validFrom: new Date(),
        validUntil: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 60 days from now
        isActive: true
    },
    {
        code: "FLASH25",
        description: "Flash sale - 25% off (max Rp.100,000)",
        discountType: "percentage",
        discountValue: 25,
        minPurchase: 200000,
        maxDiscount: 100000,
        usageLimit: 20,
        validFrom: new Date(),
        validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        isActive: true
    },
    {
        code: "FREESHIP",
        description: "Free shipping voucher - Rp.10 off",
        discountType: "fixed",
        discountValue: 10,
        minPurchase: 0,
        maxDiscount: null,
        usageLimit: null, // unlimited
        validFrom: new Date(),
        validUntil: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days from now
        isActive: true
    }
];

// To create these vouchers, send POST requests to /api/voucher/create with admin authentication
// Or use the admin panel once it's set up

export default sampleVouchers;
