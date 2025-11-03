import React, { useContext, useState } from 'react'
import './ExploreMenu.css'
import { assets, menu_list } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
const ExploreMenu = ({category,setCategory}) => {

  return (
    <div className="explore-menu" id='explore-menu'>
        <h1>Khám phá menu của chúng tôi</h1>
        <p className='explore-menu-text'>Tại Pizzaholic, chúng tôi tin rằng mỗi lát pizza là một khoảnh khắc hạnh phúc. Với công thức độc quyền kết hợp giữa lớp đế giòn tan, phô mai béo ngậy và nguồn nguyên liệu tươi ngon được chọn lọc kỹ lưỡng mỗi ngày, Pizzaholic mang đến hương vị đậm đà, chuẩn vị Ý nhưng vẫn gần gũi với khẩu vị người Việt.</p>
        <div className="explore-menu-list">
            {menu_list.map((item,index)=>{
                return(
                    <div onClick={()=> setCategory(prev=> prev===item.menu_name ? "All" : item.menu_name)} key={index} className="explore-menu-list-item">
                        <img src={item.menu_image} alt="" />
                        <p className={category===item.menu_name ? "active" : ""}>{item.menu_name}</p>
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default ExploreMenu