import { v2 as cloudinary } from 'cloudinary'
import productModel from '../models/productModel.js'

// function: Add product
const addProduct = async (req, res) => {
    try {
        const { name, description, price, gender, category, sizes, bestseller } = req.body;

        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined)

        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                return result.secure_url
            })
        )

        const productData = {
            name,
            description,
            gender,
            category,
            price: Number(price),
            bestseller: bestseller === "true" ? true : false,
            sizes: JSON.parse(sizes),
            stock: JSON.parse(sizes).reduce((acc, size) => ({ ...acc, [size]: 0 }), {}),
            image: imagesUrl,
            date: Date.now()
        }

        console.log(productData);

        const product = new productModel(productData);
        await product.save()

        res.json({ success: true, message: "Product Added" })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// function: List Product
const listProduct = async (req, res) => {
    try {

        const products = await productModel.find({});
        res.json({ success: true, products })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// function: Removing Product
const removeProduct = async (req, res) => {
    try {

        await productModel.findByIdAndDelete(req.body.id)
        res.json({ success: true, message: "Product Remove" })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// function: Single Product Info
const singleProduct = async (req, res) => {

    try {

        const { productId } = req.body
        const product = await productModel.findById(productId)
        res.json({ success: true, product })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }

}



const updateProduct = async (req, res) => {
    try {
        const { id, name, description, price, gender, category, sizes, bestseller } = req.body;

        const updateData = {};

        // Only add fields that are provided and valid
        if (bestseller !== undefined) {
            updateData.bestseller = bestseller === "true" || bestseller === true ? true : false;
        }

        // For other fields, only add them if they are provided and not empty
        if (typeof name === 'string' && name.trim() !== '') updateData.name = name.trim();
        if (typeof description === 'string' && description.trim() !== '') updateData.description = description.trim();
        if (typeof gender === 'string' && gender.trim() !== '') updateData.gender = gender.trim();
        if (typeof category === 'string' && category.trim() !== '') updateData.category = category.trim();
        if (price !== undefined && !isNaN(price) && price !== '') updateData.price = Number(price);
        if (sizes !== undefined) {
            updateData.sizes = Array.isArray(sizes) ? sizes : JSON.parse(sizes);
            // Ensure stock object has keys for all sizes
            const product = await productModel.findById(id);
            if (product) {
                const currentStock = product.stock || {};
                const newStock = {};
                updateData.sizes.forEach(size => {
                    newStock[size] = currentStock[size] !== undefined ? currentStock[size] : 0;
                });
                updateData.stock = newStock;
            }
        }

        const product = await productModel.findById(id);
        if (!product) {
            return res.json({ success: false, message: "Product not found" });
        }

        // Update only the fields that are provided
        if (updateData.name !== undefined) product.name = updateData.name;
        if (updateData.description !== undefined) product.description = updateData.description;
        if (updateData.gender !== undefined) product.gender = updateData.gender;
        if (updateData.category !== undefined) product.category = updateData.category;
        if (updateData.price !== undefined) product.price = updateData.price;
        if (updateData.sizes !== undefined) product.sizes = updateData.sizes;
        if (updateData.stock !== undefined) {
            product.stock = updateData.stock;
            product.markModified('stock');
        }
        if (updateData.bestseller !== undefined) product.bestseller = updateData.bestseller;

        await product.save();

        if (!product) {
            return res.json({ success: false, message: "Product not found" });
        }

        res.json({ success: true, message: "Product updated successfully" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export { addProduct, listProduct, removeProduct, singleProduct, updateProduct };
