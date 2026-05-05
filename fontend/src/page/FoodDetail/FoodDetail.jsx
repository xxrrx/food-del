import React, { useContext, useEffect, useState } from 'react'
import './FoodDetail.css'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { StoreContext } from '../../context/StoreContext'
import StarRating from '../../components/StarRating/StarRating'
import ReviewCard from '../../components/ReviewCard/ReviewCard'
import { formatVND } from '../../utils/formatCurrency'

const FoodDetail = () => {
  const { id } = useParams()
  const { url, token, food_list, cartItems, addToCart, removeFromCart } = useContext(StoreContext)
  const navigate = useNavigate()

  const food = food_list.find(f => f._id === id)
  const [reviews, setReviews] = useState([])
  const [canReview, setCanReview] = useState(false)
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  const [mediaFiles, setMediaFiles] = useState([])
  const [mediaPreviews, setMediaPreviews] = useState([])
  const [submitting, setSubmitting] = useState(false)

  const fetchReviews = async () => {
    const res = await axios.get(`${url}/api/review/${id}`)
    setReviews(res.data.data || [])
  }

  const fetchCanReview = async () => {
    if (!token) return
    const res = await axios.get(`${url}/api/review/can-review/${id}`, { headers: { token } })
    setCanReview(res.data.data)
  }

  useEffect(() => {
    fetchReviews()
    fetchCanReview()
  }, [id, token])

  const handleMediaChange = (e) => {
    const files = Array.from(e.target.files)
    if (files.length + mediaFiles.length > 3) {
      alert('Tối đa 3 ảnh/video')
      return
    }
    setMediaFiles(prev => [...prev, ...files])
    const previews = files.map(f => ({ url: URL.createObjectURL(f), type: f.type, name: f.name }))
    setMediaPreviews(prev => [...prev, ...previews])
  }

  const removeMedia = (index) => {
    setMediaFiles(prev => prev.filter((_, i) => i !== index))
    setMediaPreviews(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!token) { alert('Vui lòng đăng nhập'); return }
    setSubmitting(true)
    try {
      const formData = new FormData()
      formData.append('foodId', id)
      formData.append('rating', rating)
      formData.append('comment', comment)
      mediaFiles.forEach(f => formData.append('mediaFiles', f))
      const res = await axios.post(`${url}/api/review/add`, formData, { headers: { token } })
      if (res.data.success) {
        setComment('')
        setRating(5)
        setMediaFiles([])
        setMediaPreviews([])
        setCanReview(false)
        fetchReviews()
      } else {
        alert(res.data.message)
      }
    } catch {
      alert('Có lỗi xảy ra')
    }
    setSubmitting(false)
  }

  const handleDelete = async (reviewId) => {
    if (!window.confirm('Xóa đánh giá này?')) return
    await axios.delete(`${url}/api/review/${reviewId}`, { headers: { token } })
    fetchReviews()
    fetchCanReview()
  }

  const avgRating = reviews.length
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : null

  if (!food) return <div className="food-detail-loading">Đang tải...</div>

  return (
    <div className="food-detail">
      {/* Product Info */}
      <div className="food-detail-top">
        <img src={`${url}/images/${food.image}`} alt={food.name} className="food-detail-img" />
        <div className="food-detail-info">
          <p className="food-detail-category">{food.category}</p>
          <h1 className="food-detail-name">{food.name}</h1>

          <div className="food-detail-rating-summary">
            <span className="food-detail-avg-star">★</span>
            <span className="food-detail-avg">{avgRating ?? 'Chưa có đánh giá'}</span>
            {reviews.length > 0 && <span className="food-detail-count">({reviews.length} đánh giá)</span>}
          </div>

          <p className="food-detail-description">{food.description}</p>
          <p className="food-detail-price">{formatVND(food.price)} VNĐ</p>

          <div className="food-detail-actions">
            {!cartItems[id]
              ? <button className="food-detail-add-btn" onClick={() => addToCart(id)}>+ Thêm vào giỏ</button>
              : <div className="food-detail-counter">
                  <button onClick={() => removeFromCart(id)}>−</button>
                  <span>{cartItems[id]}</span>
                  <button onClick={() => addToCart(id)}>+</button>
                </div>
            }
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="food-detail-reviews">
        <h2>Đánh giá từ khách hàng</h2>

        {/* Review Form */}
        {canReview && (
          <form className="review-form" onSubmit={handleSubmit}>
            <h3>Viết đánh giá của bạn</h3>
            <div className="review-form-rating">
              <label>Số sao:</label>
              <StarRating value={rating} onChange={setRating} />
            </div>
            <textarea
              className="review-form-textarea"
              placeholder="Chia sẻ cảm nhận của bạn về món ăn..."
              value={comment}
              onChange={e => setComment(e.target.value)}
              rows={4}
            />
            <div className="review-form-media">
              <label className="review-form-upload-btn">
                📷 Thêm ảnh/video ({mediaFiles.length}/3)
                <input type="file" accept="image/*,video/*" multiple onChange={handleMediaChange} hidden />
              </label>
              <div className="review-form-previews">
                {mediaPreviews.map((p, i) => (
                  <div key={i} className="review-preview-item">
                    {p.type.startsWith('video')
                      ? <video src={p.url} className="review-preview-media" />
                      : <img src={p.url} alt="preview" className="review-preview-media" />
                    }
                    <button type="button" className="review-preview-remove" onClick={() => removeMedia(i)}>✕</button>
                  </div>
                ))}
              </div>
            </div>
            <button type="submit" className="review-form-submit" disabled={submitting}>
              {submitting ? 'Đang gửi...' : 'Gửi đánh giá'}
            </button>
          </form>
        )}

        {!token && <p className="review-login-hint">Đăng nhập và đặt món để có thể đánh giá.</p>}
        {token && !canReview && reviews.length === 0 && (
          <p className="review-login-hint">Bạn cần đặt và thanh toán món này để đánh giá.</p>
        )}

        {/* Review List */}
        <div className="review-list">
          {reviews.length === 0
            ? <p className="review-empty">Chưa có đánh giá nào. Hãy là người đầu tiên!</p>
            : reviews.map(r => (
                <ReviewCard
                  key={r._id}
                  review={r}
                  onDelete={r.userId === undefined ? null : handleDelete}
                />
              ))
          }
        </div>
      </div>
    </div>
  )
}

export default FoodDetail
