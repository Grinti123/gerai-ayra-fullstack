import userModel from "../models/userModel.js"

// add product to user wishlist
const addToWishlist = async (req, res) => {
    try {
        const { userId, itemId } = req.body

        const userData = await userModel.findById(userId)
        let wishlistData = await userData.wishlistData

        if (!wishlistData[itemId]) {
            wishlistData[itemId] = true
        }

        await userModel.findByIdAndUpdate(userId, { wishlistData })
        res.json({ success: true, message: 'Added to Wishlist' })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// remove product from user wishlist
const removeFromWishlist = async (req, res) => {
    try {
        const { userId, itemId } = req.body

        const userData = await userModel.findById(userId)
        let wishlistData = await userData.wishlistData

        if (wishlistData[itemId]) {
            delete wishlistData[itemId]
        }

        await userModel.findByIdAndUpdate(userId, { wishlistData })
        res.json({ success: true, message: 'Removed from Wishlist' })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// get user wishlist
const getUserWishlist = async (req, res) => {
    try {
        const { userId } = req.body

        const userData = await userModel.findById(userId)
        let wishlistData = await userData.wishlistData

        res.json({ success: true, wishlistData })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

export { addToWishlist, removeFromWishlist, getUserWishlist }
