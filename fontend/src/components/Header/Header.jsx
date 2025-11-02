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
          <h2>Order your favourite food here</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore cupiditate odit animi beatae consectetur neque possimus cumque dolore minus iusto sequi autem dignissimos deleniti quae fugiat pariatur ad, eos incidunt?</p>
          <button>View Menu</button>
        </div>
        <div className="spline-container">
          <spline-viewer 
            ref={viewerRef}
            url="https://prod.spline.design/EaMqzE709AqwZCMP/scene.splinecode"
          ></spline-viewer>
        </div>
      </div>
    </div>
  )
}

export default Header