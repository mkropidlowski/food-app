import React from 'react'
import { useEffect, useState } from 'react'
import { projectFirestore } from '../firebase/config'
import './Cart.css'

export const Cart = ({activePopup, setActivePopup}) => {

    const [newCart, setNewCart] = useState([])
    const [error, setError] = useState(null)
    const [cartItem, setCartItem] = useState([])

   

    useEffect(() => {
        let ref = projectFirestore.collection('cart')
    
        const unsub = ref.onSnapshot((snapshot) => {
            let result = []
            snapshot.docs.forEach(doc => {
                result.push({ ...doc.data(), id: doc.id})
        
            })
        
            setNewCart(result)
            setError(null)
        }, (error) => {
            setError('Brak danych.')
        })
        return () => unsub()
    
    }, [])

    
    /////////////////////////////////////////////

    useEffect(() => {
        let tab = []
        newCart && newCart.map(cartId => {
                projectFirestore.collection('food')
                    .doc(cartId.id)
                    .get()
                    .then(doc => {
                        tab.push({...doc.data(), id: doc.id})
                    })
                    setCartItem(tab)
        })
 
    }, [newCart])

    console.log('new cart,', newCart)
    console.log('cartitem',cartItem)

    
 
    const handleDelete = (e) => {
        e.preventDefault()
        let target = e.target.parentElement.parentElement.getAttribute('data-id')

        projectFirestore.collection('cart').doc(target).delete()
    }
       

  return (
      <>
         {activePopup ? <div className="popup">
     
            {cartItem && cartItem.map((foodData, i) => (
            <div className="card-box" key={foodData.id} data-id={foodData.id}>
                <div className="cart-box__info">
                    <h4>{foodData.text}</h4>
                    <p>Cena: {foodData.price} zł</p>
                </div>
                <div className="cart-box__btn">
                    <button className="detele-btn" onClick={handleDelete}>Usuń</button>
                </div>
                <div className="bottom-line"></div>
            </div>
            ))}
            <div className="summary-container">
            <p className="to-pay">Do zapłaty: </p>
            <button className="order-btn">Złóż zamówienie</button>
            </div>
         </div> : null
         }

      </>
   
  )
}
