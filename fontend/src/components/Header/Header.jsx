import React, { useEffect, useRef } from 'react'
import './Header.css'

const Header = () => {
  const viewerRef = useRef(null)
  
  useEffect(() => {
  }, [])

  return (
    <div className='header'>
      <div className="header-contents">
        <div className="text-content">
          <h2>Đặt món ăn yêu thích của bạn ngay hôm nay</h2>
          <p>
            Tại <strong>Pizzaholic</strong>, chúng tôi mang đến cho bạn những món pizza
            thơm ngon, nóng hổi và đậm đà hương vị Ý. Từng chiếc pizza được làm thủ công
            từ lớp đế giòn tan, phô mai béo ngậy cùng nguồn nguyên liệu tươi mới mỗi ngày —
            sẵn sàng để chinh phục vị giác của bạn!
          </p>
          <button>Xem Thực Đơn</button>
        </div>
        <div className="spline-container">
          {/* <spline-viewer 
            ref={viewerRef}
            url="https://prod.spline.design/EaMqzE709AqwZCMP/scene.splinecode"
          ></spline-viewer> */}
        </div>
      </div>
    </div>
  )
}

export default Header
