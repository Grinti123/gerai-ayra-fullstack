import { v2 as cloudinary } from 'cloudinary'
import settingModel from '../models/settingModel.js'

// Get Website Settings
const getSettings = async (req, res) => {
    try {
        let settings = await settingModel.findOne({});
        if (!settings) {
            // Create default settings if not exists
            settings = await settingModel.create({});
        }
        res.json({ success: true, settings });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// Update Website Settings
const updateSettings = async (req, res) => {
    try {
        const {
            siteName,
            siteDescription,
            contactEmail,
            contactPhone,
            address,
            facebook,
            instagram,
            whatsapp,
            footerText
        } = req.body;

        const files = req.files;
        const updateData = {
            siteName,
            siteDescription,
            contactEmail,
            contactPhone,
            address,
            socialLinks: {
                facebook,
                instagram,
                whatsapp
            },
            footerText
        };

        // Handle Logo Upload
        if (files && files.logo && files.logo[0]) {
            const logoUpload = await cloudinary.uploader.upload(files.logo[0].path, { resource_type: 'image' });
            updateData.logo = logoUpload.secure_url;
        }

        // Handle Favicon Upload
        if (files && files.favicon && files.favicon[0]) {
            const faviconUpload = await cloudinary.uploader.upload(files.favicon[0].path, { resource_type: 'image' });
            updateData.favicon = faviconUpload.secure_url;
        }

        let settings = await settingModel.findOneAndUpdate({}, updateData, { new: true, upsert: true });

        res.json({ success: true, message: "Settings Updated", settings });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export { getSettings, updateSettings }
