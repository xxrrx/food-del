import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets';
import { formatVND } from '../../utils/formatCurrency';

const Cart = () => {

  const { cartItems, removeFromCart, food_list, removeAll, addToCart, getTotalCartAmount, url } = useContext(StoreContext);
  const navigate = useNavigate();

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Sản phẩm</p>
          <p>Tên món</p>
          <p>Giá</p>
          <p>Số lượng</p>
          <p>Tổng cộng</p>
          <p>Xóa tất cả</p>
        </div>
        <br />
        <hr />
        <div className={getTotalCartAmount() === 0 ? "empty_cart" : "disable"}>
          <img src={assets.empty_cart} alt=""/>
          <p onClick={() => navigate('/')}>QUAY LẠI TRANG CHỦ</p>
        </div>
        {
          food_list.map((item, index) => {
            if (cartItems[item._id] > 0) {
              return (
                <div key={index}>
                  <div className="cart-items-title cart-items-item">
                    <img src={url + "/images/" + item.image} alt="" />
                    <p>{item.name}</p>
                    <p>{formatVND(item.price)} VNĐ</p>
                    <div className="quantity-changer">
                      <button className="btn" onClick={() => removeFromCart(item._id)}>−</button>
                      <p>{cartItems[item._id]}</p>
                      <button className="btn" onClick={() => addToCart(item._id)}>+</button>
                    </div>
                    <p>{formatVND(item.price * cartItems[item._id])} VNĐ</p>
                    <p onClick={() => removeAll(item._id)} className='cross'>x</p>
                  </div>
                  <hr />
                </div>
              )
            }
          })
        }
      </div>
      <div className={getTotalCartAmount() === 0 ? "disable" : "cart-bottom"}>
        <div className="cart-total">
          <h2>Tổng đơn hàng</h2>
          <div>
            <div className="cart-total-details">
              <p>Tạm tính</p>
              <p>{formatVND(getTotalCartAmount())} VNĐ</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Phí giao hàng</p>
              <p>{formatVND(getTotalCartAmount() === 0 ? 0 : 20000)} VNĐ</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Tổng cộng</b>
              <b>{formatVND(getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 20000)} VNĐ</b>
            </div>
          </div>
          <button onClick={() => navigate('/order')}>TIẾN HÀNH THANH TOÁN</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>Nếu bạn có mã giảm giá, hãy nhập vào đây</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder='Nhập mã giảm giá' />
              <button>Áp dụng</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
