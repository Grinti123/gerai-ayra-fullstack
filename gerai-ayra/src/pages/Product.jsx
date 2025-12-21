import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';
import StarRating from '../components/StarRating';
import { toast } from 'react-toastify';
import axios from 'axios';

const Product = () => {

  const { productId } = useParams();
  const { products, currency, addToCart, backendUrl, token, navigate, wishlistItems, addToWishlist, removeFromWishlist } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('')
  const [size, setSize] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('description')
  const [reviews, setReviews] = useState([])
  const [averageRating, setAverageRating] = useState(0)
  const [totalReviews, setTotalReviews] = useState(0)
  const [userRating, setUserRating] = useState(5)
  const [userComment, setUserComment] = useState('')
  const [showReviewForm, setShowReviewForm] = useState(false)

  const fetchProductData = async () => {
    const product = products.find((item) => item._id === productId);
    if (product) {
      setProductData(product)
      setImage(product.image && product.image.length > 0 ? product.image[0] : 'https://via.placeholder.com/600x800?text=No+Image')
    }
  }

  const fetchReviews = async () => {
    try {
      const response = await axios.post(backendUrl + '/api/review/get', { productId })
      if (response.data.success) {
        setReviews(response.data.reviews)
        setAverageRating(response.data.averageRating)
        setTotalReviews(response.data.totalReviews)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const handleSubmitReview = async (e) => {
    e.preventDefault()

    if (!token) {
      toast.error('Please login to submit a review')
      return
    }

    if (!userComment.trim()) {
      toast.error('Please write a comment')
      return
    }

    try {
      const response = await axios.post(
        backendUrl + '/api/review/add',
        {
          productId: productData._id,
          rating: userRating,
          comment: userComment
        },
        { headers: { token } }
      )

      if (response.data.success) {
        toast.success('Review submitted successfully!')
        setUserComment('')
        setUserRating(5)
        setShowReviewForm(false)
        fetchReviews()
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const handleAddToCart = async () => {
    if (!size) {
      alert('Please select a size')
      return
    }
    setLoading(true)
    // Simulate loading for better UX
    setTimeout(() => {
      for (let i = 0; i < quantity; i++) {
        addToCart(productData._id, size)
      }
      setLoading(false)
    }, 500)
  }

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1)
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1)
    }
  }

  useEffect(() => {
    fetchProductData();
    fetchReviews();
  }, [productId, products])

  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* Product Data */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        {/* Product Images */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {
              productData.image.map((item, index) => (
                <img onClick={() => setImage(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex flex-shrink-0 cursor-pointer' alt="" />
              ))
            }
          </div>
          <div className='w-full sm:w-[80%]'>
            <img className='w-full h-auto' src={image || 'https://via.placeholder.com/600x800?text=No+Image'} alt="" />
          </div>
        </div>

        {/* Product Info */}
        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
          <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
          <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
          <div className='flex items-center gap-2 mt-3'>
            <StarRating rating={averageRating} size='w-5' />
            <span className='text-gray-600'>({totalReviews} reviews)</span>
          </div>
          <div className='flex flex-col gap-4 my-8'>
            <p>Select Size</p>
            <div className='flex gap-2'>
              {productData.sizes.map((item, index) => (
                <button onClick={() => setSize(item)} className={`border py-2 px-4 bg-gray-100 ${item === size ? 'border-orange-500' : ''}`} key={index} > {item}</button>
              ))}
            </div>
          </div>
          <div className='flex items-center gap-4'>
            <button
              onClick={() => addToCart(productData._id, size)}
              className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700 hover:bg-gray-800 transition-all rounded-sm flex-grow sm:flex-grow-0'
            >
              ADD TO CART
            </button>
            <button
              onClick={() => wishlistItems[productData._id] ? removeFromWishlist(productData._id) : addToWishlist(productData._id)}
              className={`p-3 border rounded-sm transition-all shadow-sm ${wishlistItems[productData._id] ? 'bg-red-50 border-red-200 text-red-500' : 'bg-white hover:bg-gray-50 text-gray-400'}`}
              title={wishlistItems[productData._id] ? 'Remove from Wishlist' : 'Add to Wishlist'}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill={wishlistItems[productData._id] ? "currentColor" : "none"} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
            </button>
          </div>
          <hr className='mt-8 sm:w-4/5' />
          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
            <p>100% Original Product</p>
            <p>Cash on Delivery is available on this product</p>
            <p>Easy return and exchange policy in 7 days</p>
          </div>
        </div>
      </div>

      {/* Description & Review Section */}
      <div className='mt-20'>
        <div className='flex border-b'>
          <button
            className={`px-6 py-3 text-sm font-medium ${activeTab === 'description' ? 'border-b-2 border-black' : 'text-gray-500'}`}
            onClick={() => setActiveTab('description')}
          >
            Description
          </button>
          <button
            className={`px-6 py-3 text-sm font-medium ${activeTab === 'reviews' ? 'border-b-2 border-black' : 'text-gray-500'}`}
            onClick={() => setActiveTab('reviews')}
          >
            Reviews ({totalReviews})
          </button>
        </div>

        {activeTab === 'description' && (
          <div className='py-6 text-sm text-gray-500'>
            <p className='mb-4'>{productData.description}</p>
            <p className='mb-4'>
              This product is crafted with premium materials to ensure durability and comfort.
              Perfect for everyday wear, it combines style with functionality.
            </p>
            <p>
              Care Instructions: Machine wash cold, tumble dry low. Do not bleach or iron directly on design.
            </p>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className='py-6'>
            <div className='mb-6'>
              <div className='flex items-center gap-4 mb-4'>
                <div className='text-center'>
                  <div className='text-4xl font-bold'>{averageRating}</div>
                  <StarRating rating={averageRating} size='w-5' />
                  <div className='text-sm text-gray-500 mt-1'>{totalReviews} reviews</div>
                </div>
              </div>

              {token && !showReviewForm && (
                <button
                  onClick={() => setShowReviewForm(true)}
                  className='bg-black text-white px-6 py-2 text-sm hover:bg-gray-800 transition-colors'
                >
                  Write a Review
                </button>
              )}

              {!token && (
                <p className='text-sm text-gray-500 mb-4'>
                  Please <span className='text-black font-medium cursor-pointer' onClick={() => navigate('/login')}>login</span> to write a review
                </p>
              )}

              {showReviewForm && (
                <form onSubmit={handleSubmitReview} className='bg-gray-50 p-4 rounded-lg mb-6 mt-4'>
                  <h3 className='font-medium mb-3'>Write Your Review</h3>
                  <div className='mb-4'>
                    <label className='block text-sm mb-2'>Your Rating</label>
                    <StarRating
                      rating={userRating}
                      size='w-8'
                      interactive={true}
                      onRatingChange={setUserRating}
                    />
                  </div>
                  <div className='mb-4'>
                    <label className='block text-sm mb-2'>Your Review</label>
                    <textarea
                      value={userComment}
                      onChange={(e) => setUserComment(e.target.value)}
                      className='w-full border border-gray-300 rounded p-3 min-h-[100px]'
                      placeholder='Share your experience with this product...'
                      required
                    />
                  </div>
                  <div className='flex gap-2'>
                    <button
                      type='submit'
                      className='bg-black text-white px-6 py-2 text-sm hover:bg-gray-800'
                    >
                      Submit Review
                    </button>
                    <button
                      type='button'
                      onClick={() => {
                        setShowReviewForm(false)
                        setUserComment('')
                        setUserRating(5)
                      }}
                      className='border border-gray-300 px-6 py-2 text-sm hover:bg-gray-50'
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>

            <div className='space-y-4'>
              {reviews.length === 0 ? (
                <p className='text-gray-500 text-center py-8'>No reviews yet. Be the first to review!</p>
              ) : (
                reviews.map((review, index) => (
                  <div key={index} className='border-b pb-4'>
                    <div className='flex justify-between items-start mb-2'>
                      <div>
                        <p className='font-medium'>{review.userName}</p>
                        <StarRating rating={review.rating} size='w-4' />
                      </div>
                      <span className='text-xs text-gray-500'>
                        {new Date(review.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                    <p className='text-sm text-gray-700'>{review.comment}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {/* Display Related Products */}

      <RelatedProducts
        gender={productData.gender || (productData.subCategory ? productData.category : null)}
        category={productData.subCategory ? productData.subCategory : productData.category}
      />

    </div>
  ) : <div className='opacity-0' ></div>
}

export default Product
