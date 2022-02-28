import React from 'react'
import './Navbar.css'
// import loupe from '../img/search.png'
import cart from '../img/shopping-cart.png'


export default function Navbar() {
  return (
    <div className="navbar-container">
        <div className="navbar-logo">
            <h1>Foodline</h1>
        </div>
        <div className="navbar-btn">
            <img src={cart} alt="shopping cart" />
        </div>

        

    </div>
  )
}
