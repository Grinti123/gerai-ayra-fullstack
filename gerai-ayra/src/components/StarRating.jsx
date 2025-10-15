import React from 'react'
import { assets } from '../assets/assets'

const StarRating = ({ rating, size = 'w-4', onRatingChange = null, interactive = false }) => {
  const stars = [1, 2, 3, 4, 5]

  const handleClick = (star) => {
    if (interactive && onRatingChange) {
      onRatingChange(star)
    }
  }

  return (
    <div className='flex gap-1'>
      {stars.map((star) => (
        <img
          key={star}
          src={star <= rating ? assets.star_icon : assets.star_dull_icon}
          alt="star"
          className={`${size} ${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : ''}`}
          onClick={() => handleClick(star)}
        />
      ))}
    </div>
  )
}

export default StarRating
