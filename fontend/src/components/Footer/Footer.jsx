import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
    return(
        <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <img className='logo-img' src={assets.logo} alt="" />
                <p>Pizzaholic - Nơi mang đến những trải nghiệm ẩm thực tuyệt vời với pizza thơm ngon, nóng hổi được làm từ nguyên liệu tươi mới mỗi ngày. Chúng tôi cam kết phục vụ bạn với chất lượng tốt nhất và dịch vụ tận tâm.</p>
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                </div>
            </div>
            <div className="footer-content-center">
                <h2>CÔNG TY</h2>
                <ul>
                    <li>Trang chủ</li>
                    <li>Về chúng tôi</li>
                    <li>Giao hàng</li>
                    <li>Chính sách bảo mật</li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>LIÊN HỆ</h2>
                <ul>
                    <li>+84-961-056-048</li>
                    <li>contact@Pizzaholic.com</li>
                </ul>
            </div>
        </div>
        <hr />
        <p className='footer-copyright'>Bản quyền 2025 © Pizzaholic.com - Đã đăng ký bản quyền.</p>
    </div>
    )
}
export default Footer