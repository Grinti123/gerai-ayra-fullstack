import reviewModel from "../models/reviewModel.js";
import userModel from "../models/userModel.js";

// Add a review
const addReview = async (req, res) => {
    try {
        const { productId, rating, comment } = req.body;
        const userId = req.body.userId;

        // Get user name
        const user = await userModel.findById(userId);
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        // Check if user already reviewed this product
        const existingReview = await reviewModel.findOne({ productId, userId });
        if (existingReview) {
            return res.json({ success: false, message: "You have already reviewed this product" });
        }

        const reviewData = {
            productId,
            userId,
            userName: user.name,
            rating: Number(rating),
            comment,
            date: Date.now()
        };

        const review = new reviewModel(reviewData);
        await review.save();

        res.json({ success: true, message: "Review added successfully", review });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Get all reviews for a product
const getProductReviews = async (req, res) => {
    try {
        const { productId } = req.body;
        const reviews = await reviewModel.find({ productId }).sort({ date: -1 });
        
        // Calculate average rating
        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
        const averageRating = reviews.length > 0 ? (totalRating / reviews.length).toFixed(1) : 0;

        res.json({ 
            success: true, 
            reviews, 
            averageRating: Number(averageRating),
            totalReviews: reviews.length 
        });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Delete a review (user can only delete their own review)
const deleteReview = async (req, res) => {
    try {
        const { reviewId } = req.body;
        const userId = req.body.userId;

        const review = await reviewModel.findById(reviewId);
        
        if (!review) {
            return res.json({ success: false, message: "Review not found" });
        }

        if (review.userId !== userId) {
            return res.json({ success: false, message: "Unauthorized to delete this review" });
        }

        await reviewModel.findByIdAndDelete(reviewId);
        res.json({ success: true, message: "Review deleted successfully" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Update a review
const updateReview = async (req, res) => {
    try {
        const { reviewId, rating, comment } = req.body;
        const userId = req.body.userId;

        const review = await reviewModel.findById(reviewId);
        
        if (!review) {
            return res.json({ success: false, message: "Review not found" });
        }

        if (review.userId !== userId) {
            return res.json({ success: false, message: "Unauthorized to update this review" });
        }

        review.rating = rating;
        review.comment = comment;
        review.date = Date.now();

        await review.save();
        res.json({ success: true, message: "Review updated successfully", review });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const getAllReviews = async (req, res) => {
    try {
        const reviews = await reviewModel.find({}).sort({ date: -1 });

        res.json({
            success: true,
            reviews
        });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export { addReview, getProductReviews, deleteReview, updateReview, getAllReviews };
