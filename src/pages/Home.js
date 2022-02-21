import './Home.css'
import fastfood from '../img/fast-food.png';

import React from 'react'
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="home-container">
        <div className="home-logo">
            <img src={fastfood} alt="food icon" />
            <h1>Foodline</h1>
        </div>
        <div className="home-btn">
            <Link to="/menu"><button className="btn-get-started">Przejdź do menu</button></Link>
        </div>
        <div className="create-by">
           <h5>Wykonał Michał Kropidłowski 2022</h5>
        </div>
    </div>
  )
}
