import React from 'react'
import './False.css'
import { useNavigate } from 'react-router-dom'

const False = () => {
  const navigate = useNavigate()

  return (
    <div className='payment-false'>
      <div className="false-container">
        <div className="false-icon">✕</div>
        <h2>Thanh toán thất bại!</h2>
        <p className="false-message">Đơn hàng của bạn chưa được thanh toán thành công.</p>
        <p className="false-description">
          Có thể do lỗi kết nối, số dư không đủ hoặc bạn đã hủy giao dịch. 
          Vui lòng thử lại hoặc chọn phương thức thanh toán khác.
        </p>

        <div className="false-actions">
          <button className="btn-retry" onClick={() => navigate('/cart')}>Thử lại</button>
          <button className="btn-home" onClick={() => navigate('/')}>Về trang chủ</button>
        </div>
      </div>
    </div>
  )
}

export default False
