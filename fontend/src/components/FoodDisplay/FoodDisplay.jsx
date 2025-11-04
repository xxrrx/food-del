import React, { useContext } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'
import { assets } from '../../assets/assets'
const FoodDisplay = ({category}) => {
    const{food_list,searchItems,setSearchItems} = useContext(StoreContext)
      
    const onChangeHandler = (event)=>{
        setSearchItems(event.target.value);
    }
    
  return (
    <div className='food-display' id='food-display'>
        <div className='food-display-top'>
          <h2>Món ngon gần bạn</h2>
          <div className='search'>
            <input value={searchItems} onChange={onChangeHandler} type="text" placeholder="Tìm kiếm" />
            <img src={assets.search_icon} alt="" />
          </div>
        </div>
        <div className="food-display-list">
            {food_list.map((item,index) =>{
              if(category ==="All" || category === item.category){
                if(item.name.toLowerCase().includes(searchItems.trim().toLowerCase())){
                  return <FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image}/>
                }
              }
            })}
        </div>
    </div>
  )
}

export default FoodDisplay