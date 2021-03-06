import React from 'react'
import './Navbar.css'
// import loupe from '../img/search.png'
import cart from '../img/shopping-cart.png'
import { Link } from 'react-router-dom';
import { useState } from 'react'
import { Cart } from './Cart'

export default function Navbar() {

  const [activePopup, setActivePopup] = useState(false)

  const handleClick = () => {
    setActivePopup(prev => !prev)
  }


  return (
    <>
    <div className="navbar-container">
        <div className="navbar-logo">
            <Link to="/menu"><h1>Foodline</h1></Link>
        </div>
        <div className="navbar-btn">
            <img src={cart} alt="shopping cart" onClick={handleClick}/>
        </div>
    </div>
    <div className="cart-container">
            <Cart activePopup={activePopup} setActivePopup={setActivePopup}/>
    </div>
    </>
  )
}
