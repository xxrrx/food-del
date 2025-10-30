import React, { use, useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets';
const Cart = () => {

  const{cartItems,removeFromCart,food_list,removeAll,addToCart,getTotalCartAmount,url} = useContext(StoreContext);
  const navigate = useNavigate();

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove All</p>
        </div>
        <br />
        <hr />
        <div className={getTotalCartAmount()===0?"empty_cart":"disable"}>
          <img src={assets.empty_cart} alt=""/>
          <p onClick={()=> navigate('/')}>RETURN TO HOME</p>
        </div>
        {
          food_list.map((item,index)=>{
            if(cartItems[item._id]>0){
              return(
                <div>
                  <div className="cart-items-title cart-items-item">
                    <img src={url+"/images/"+item.image} alt="" />
                    <p>{item.name}</p>
                    <p>${item.price}</p>
                    <div className="quantity-changer">
                      <button className="btn" onClick={()=>removeFromCart(item._id)}>−</button>
                      <p>{cartItems[item._id]}</p>
                      <button className="btn" onClick={()=>addToCart(item._id)}>+</button>
                    </div>
                    <p>${item.price*cartItems[item._id]}</p>
                    <p onClick={()=> removeAll(item._id)} className='cross'>x</p>
                  </div>
                  <hr />
                </div>
              )
            }
          })
        }
      </div>
      <div className={getTotalCartAmount()===0?"disable":"cart-bottom"}>
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount()===0?0:2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount()===0?0:getTotalCartAmount()+2}</b>
            </div>
          </div>
          <button onClick={()=> navigate('/order')}>PROCESS TO CHECKOUT</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, Enter it here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder='promo code' />
              <button> Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
