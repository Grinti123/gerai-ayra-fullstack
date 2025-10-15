import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'
import StarRating from '../../../gerai-ayra/src/components/StarRating'

const Reviews = ({ token }) => {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchAllReviews = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/review/all', { headers: { token } })
      if (response.data.success) {
        setReviews(response.data.reviews)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error('Failed to fetch reviews')
    } finally {
      setLoading(false)
    }
  }

  const deleteReview = async (reviewId) => {
    if (!window.confirm('Are you sure you want to delete this review?')) {
      return
    }

    try {
      const response = await axios.post(
        backendUrl + '/api/review/delete',
        { reviewId },
        { headers: { token } }
      )

      if (response.data.success) {
        toast.success('Review deleted successfully')
        fetchAllReviews()
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error('Failed to delete review')
    }
  }

  useEffect(() => {
    fetchAllReviews()
  }, [token])

  if (loading) {
    return (
      <div className='flex items-center justify-center py-16'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500'></div>
      </div>
    )
  }

  return (
    <div className='p-6'>
      <h1 className='bg-gradient-to-r from-slate-700 via-blue-600 to-indigo-600 bg-clip-text text-transparent text-3xl font-bold mb-8'>Customer Reviews Management</h1>

      {reviews.length === 0 ? (
        <div className='bg-white p-16 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-slate-200/50 text-center'>
          <div className='w-24 h-24 bg-gradient-to-br from-slate-50 to-slate-100 rounded-full flex items-center justify-center mx-auto mb-4'>
            <svg className='w-10 h-10 text-slate-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'></path>
            </svg>
          </div>
          <p className='text-slate-500 text-lg font-medium'>No reviews yet</p>
          <p className='text-slate-400 text-sm'>Customer reviews will appear here once they are submitted</p>
        </div>
      ) : (
        <div className='space-y-6'>
          {reviews.map((review, index) => (
            <div key={review._id} className='bg-white p-6 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-slate-200/50 hover:shadow-[0_8px_25px_rgba(0,0,0,0.12)] hover:scale-[1.01] transition-all duration-300 animate-fade-in' style={{animationDelay: `${index * 100}ms`}}>
              <div className='flex items-start justify-between mb-4'>
                <div className='flex items-center gap-4 mb-4'>
                  <div className='w-12 h-12 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-full flex items-center justify-center shadow-sm'>
                    <svg className='w-6 h-6 text-indigo-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className='font-semibold text-lg text-slate-800'>{review.userName}</h3>
                    <div className='flex items-center gap-3 mt-1'>
                      <StarRating rating={review.rating} size='w-4' />
                      <span className='text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-full font-medium'>
                        {review.rating}/5
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => deleteReview(review._id)}
                  className='bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md hover:shadow-lg transition-all duration-200 hover:from-red-600 hover:to-red-700'
                >
                  Delete
                </button>
              </div>

              <div className='bg-slate-50 rounded-lg p-4 mb-4'>
                <p className='text-slate-700 leading-relaxed'>{review.comment}</p>
              </div>

              <div className='flex items-center justify-between text-xs text-slate-500'>
                <div className='flex items-center gap-4'>
                  <span className='bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-medium'>
                    Product ID: {review.productId}
                  </span>
                </div>
                <div className='flex items-center gap-2 text-slate-400'>
                  <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'></path>
                  </svg>
                  <span>
                    {new Date(review.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Reviews
