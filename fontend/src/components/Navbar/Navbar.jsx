import React, { use, useContext, useEffect, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'

const navbar = ({ setShowLogin }) => {

  const [menu, setMenu] = useState("home")
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext)
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem("token")
    setToken("")
    navigate("/")
  }

  return (
    <div className='navbar-container'>
      <div className='navbar'>
        <Link to='/' onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}><img src={assets.logo} alt='logo' className='logo'></img></Link>
        <ul className='navbar-menu'>
          <Link to='/' onClick={()=> {setMenu("home"); window.scrollTo({ top: 0, behavior: "smooth" });}}  className={menu==="home" ? "active":""}>Trang chủ</Link>
          <a href='#explore-menu' onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>Menu</a>
          <a href='#footer' onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>Liên hệ</a>
        </ul>
        <div className='navbar-right'>
          <div className='navbar-search-icon'>
            <Link to='/cart'><img src={assets.basket_icon}></img></Link>
            <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
          </div>
          {!token ? <button onClick={() => setShowLogin(true)}>Đăng nhập</button> :
            <div className="navbar-profile">
              <img src={assets.profile_icon} alt="" />
              <ul className="navbar-profile-dropdown">
                <li onClick={() => navigate("/myorders")}><img src={assets.bag_icon} alt="" />
                  <p>Đơn hàng</p>
                </li>
                <hr />
                <li onClick={logOut}><img src={assets.logout_icon} alt="" />
                  <p>Đăng xuất</p>
                </li>
              </ul>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default navbar
