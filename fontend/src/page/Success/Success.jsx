import React, { useContext, useEffect, useState } from 'react'
import './Success.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { assets } from '../../assets/assets'
import { formatVND } from '../../utils/formatCurrency'

const Success = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { url, token } = useContext(StoreContext)
  const [orderData, setOrderData] = useState(null)
  const orderId = location.state?.orderId

  const getStatusText = (status) => {
    const statusMap = {
      "Food Processing": "Đang xử lý",
      "Out for delivery": "Đang giao hàng",
      "Delivered": "Đã giao hàng"
    }
    return statusMap[status] || status;
  }

  useEffect(() => {
    if (!orderId) {
      navigate('/')
      return
    }

    const fetchOrderDetails = async () => {
      try {
        const response = await axios.post(url + "/api/order/userorders", {}, { headers: { token } })
        if (response.data.success) {
          const order = response.data.data.find(o => o._id === orderId)
          if (order) {
            setOrderData(order)
          } else {
            navigate('/')
          }
        }
      } catch (error) {
        console.log(error)
        navigate('/')
      }
    }

    if (token) {
      fetchOrderDetails()
    }
  }, [orderId, token, url, navigate])

  if (!orderData) {
    return (
      <div className='success'>
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div className='success'>
      <div className="success-container">
        <div className="success-icon">✓</div>
        <h2>Thanh toán thành công!</h2>
        <p className="success-message">Đơn hàng của bạn đã được xác nhận và đang được xử lý.</p>
        
        <div className="order-details">
          <h3>Thông tin đơn hàng</h3>
          <div className="order-info">
            <div className="info-row">
              <span className="label">Mã đơn hàng:</span>
              <span className="value">{orderData._id}</span>
            </div>
            <div className="info-row">
              <span className="label">Ngày đặt:</span>
              <span className="value">{new Date(orderData.date).toLocaleString('vi-VN')}</span>
            </div>
            <div className="info-row">
              <span className="label">Trạng thái:</span>
              <span className="value status">{getStatusText(orderData.status)}</span>
            </div>
          </div>

          <h3>Sản phẩm</h3>
          <div className="order-items">
            {orderData.items.map((item, index) => (
              <div key={index} className="order-item">
                <img src={url + "/images/" + item.image} alt={item.name} />
                <div className="item-info">
                  <p className="item-name">{item.name}</p>
                  <p className="item-quantity">Số lượng: {item.quantity}</p>
                </div>
                <p className="item-price">{formatVND(item.price * item.quantity)} VNĐ</p>
              </div>
            ))}
          </div>

          <h3>Địa chỉ giao hàng</h3>
          <div className="address-info">
            <p><strong>Họ tên:</strong> {orderData.address.firstName} {orderData.address.lastName}</p>
            <p><strong>Email:</strong> {orderData.address.email}</p>
            <p><strong>Số điện thoại:</strong> {orderData.address.phone}</p>
            <p><strong>Địa chỉ:</strong> {orderData.address.street}</p>
            <p><strong>Thành phố:</strong> {orderData.address.city}</p>
            <p><strong>Quốc gia:</strong> {orderData.address.country}</p>
          </div>

          <div className="total-amount">
            <span>Tổng tiền:</span>
            <span className="amount">{formatVND(orderData.amount)} VNĐ</span>
          </div>
        </div>

        <div className="success-actions">
          <button className="btn-home" onClick={() => navigate('/')}>Về trang chủ</button>
          <button className="btn-orders" onClick={() => navigate('/myorders')}>Xem đơn hàng</button>
        </div>
      </div>
    </div>
  )
}

export default Success
