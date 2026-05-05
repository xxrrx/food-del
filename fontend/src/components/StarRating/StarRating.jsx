import React from 'react'
import './StarRating.css'

const StarRating = ({ value, onChange, readonly = false }) => {
  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`star ${star <= value ? 'filled' : ''} ${!readonly ? 'clickable' : ''}`}
          onClick={() => !readonly && onChange && onChange(star)}
        >
          ★
        </span>
      ))}
    </div>
  )
}

export default StarRating
