import React, { useContext } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import { formatVND } from '../../utils/formatCurrency'
import { useNavigate } from 'react-router-dom'

const FoodItem = ({id, name, price, description, image}) => {
  const { cartItems = {}, addToCart, removeFromCart, url, ratings } = useContext(StoreContext)
  const navigate = useNavigate()
  const avg = ratings[id]

  return (
    <div className='food-item'>
      <div className="food-item-img-container">
        <img
          className='food-item-image'
          src={url + "/images/" + image}
          onClick={() => navigate(`/food/${id}`)}
          style={{cursor: 'pointer'}}
        />
        {!cartItems[id]
          ? <img className='add' src={assets.add_icon_white} onClick={() => addToCart(id)} />
          : <div className="food-item-counter">
              <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red} alt="" />
              <p>{cartItems[id]}</p>
              <img onClick={() => addToCart(id)} src={assets.add_icon_green} alt="" />
            </div>
        }
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <div className="food-item-stars">
            {avg
              ? <>
                  <span className="food-item-star-icon">★</span>
                  <span className="food-item-star-value">{avg}</span>
                </>
              : <span className="food-item-no-rating">Chưa có</span>
            }
          </div>
        </div>
        <p className="food-item-description">{description}</p>
        <p className="food-item-price">{formatVND(price)} VNĐ</p>
      </div>
    </div>
  )
}

export default FoodItem
