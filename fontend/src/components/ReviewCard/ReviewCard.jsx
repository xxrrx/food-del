import React, { useContext, useState } from 'react'
import './ReviewCard.css'
import StarRating from '../StarRating/StarRating'
import { StoreContext } from '../../context/StoreContext'

const ReviewCard = ({ review, onDelete }) => {
  const { url, token, getImageUrl } = useContext(StoreContext)
  const [lightbox, setLightbox] = useState(null)

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('vi-VN', {
      day: '2-digit', month: '2-digit', year: 'numeric'
    })
  }

  const isVideo = (filename) => {
    return /\.(mp4|webm|ogg|mov)$/i.test(filename)
  }

  return (
    <div className="review-card">
      <div className="review-card-header">
        <div className="review-user-info">
          <div className="review-avatar">{review.userName?.charAt(0).toUpperCase()}</div>
          <div>
            <p className="review-username">{review.userName}</p>
            <p className="review-date">{formatDate(review.date)}</p>
          </div>
        </div>
        <div className="review-card-right">
          <StarRating value={review.rating} readonly />
          {onDelete && (
            <button className="review-delete-btn" onClick={() => onDelete(review._id)}>Xóa</button>
          )}
        </div>
      </div>

      {review.comment && <p className="review-comment">{review.comment}</p>}

      {review.mediaFiles?.length > 0 && (
        <div className="review-media">
          {review.mediaFiles.map((file, i) => (
            isVideo(file)
              ? <video key={i} src={getImageUrl(file)} controls className="review-media-item" />
              : <img key={i} src={getImageUrl(file)} alt="review" className="review-media-item"
                  onClick={() => setLightbox(getImageUrl(file))} />
          ))}
        </div>
      )}

      {lightbox && (
        <div className="review-lightbox" onClick={() => setLightbox(null)}>
          <img src={lightbox} alt="preview" />
        </div>
      )}
    </div>
  )
}

export default ReviewCard
