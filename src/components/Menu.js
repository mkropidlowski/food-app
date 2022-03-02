import React from 'react'
import { useEffect, useState } from 'react';
import { projectFirestore } from '../firebase/config'
import { Link } from 'react-router-dom';
import Food from './Food';
import './Menu.css'

export default function Menu () {

  const menuList = [
    {
      "text": "Pizza",
      "link": "/menu"
    },
    {
      "text": "Burgery",
      "link": "/menu"
    },
    {
      "text": "Dania główne",
      "link": "/menu"
    },
    {
      "text": "Sushi",
      "link": "/menu"
    },
    {
      "text": "Napoje",
      "link": "/menu"
    }
  ]

  const [foodName, setFoodName] = useState('');
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  const handleClick = (e) => {
    e.preventDefault()
    setFoodName(e.target.innerText.toLowerCase())
    
  }
  const menuListArray = menuList.map((content, i) => {
    return (
      <ul key={i} className="menu">
        <li className="menu-links"><Link to={content.link} onClick={handleClick}>{content.text}</Link></li>
      </ul>
     
     )
   })

  useEffect(() => {
 
      let ref = projectFirestore.collection('food').where('name', '==', foodName)

      const unsub = ref.onSnapshot((snapshot) => {
          let result = []
          snapshot.docs.forEach(doc => {
              result.push({ ...doc.data(), id: doc.id})
      
          })
    
          setData(result)
          setError(null)
      }, (error) => {
          setError(error, 'Brak danych.')
      })

      return () => unsub()

  }, [foodName])
  
  return (
    <>
    <div className="container">
      <div className="nav">{menuListArray}</div>
      
      <div className="food-container">
        <h2 className="food-container__header">Wybierz interesującą Cię kategorie..</h2>
        {!data && <p>Ładowanie menu...</p>}
        {data && <Food foodData={data} text={foodName}/>}
      </div>
    </div>
      
    </>


  )
}
