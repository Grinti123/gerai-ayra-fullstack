import mongoose from "mongoose";

const settingSchema = new mongoose.Schema({
    siteName: { type: String, default: "Gerai Ayra" },
    siteDescription: { type: String, default: "Toko Fashion Terlengkap" },
    logo: { type: String, default: "" },
    favicon: { type: String, default: "" },
    contactEmail: { type: String, default: "" },
    contactPhone: { type: String, default: "" },
    address: { type: String, default: "" },
    socialLinks: {
        facebook: { type: String, default: "" },
        instagram: { type: String, default: "" },
        whatsapp: { type: String, default: "" }
    },
    footerText: { type: String, default: "© 2024 Gerai Ayra. All rights reserved." }
}, { timestamps: true });

const settingModel = mongoose.models.setting || mongoose.model("setting", settingSchema);

export default settingModel;
