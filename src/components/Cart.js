import React from 'react'
import { useEffect, useState } from 'react'
import { projectFirestore } from '../firebase/config'

export const Cart = ({activePopup, setActivePopup}) => {

    const [newCart, setNewCart] = useState(null)
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

    useEffect(() => {
        let tab = []
        newCart && newCart.map(cartId => {
            cartId.uid.forEach(foodDetails => {  
                projectFirestore.collection('food')
                    .doc(foodDetails)
                    .get()
                    .then(doc => {
                        tab.push({...doc.data(), id: doc.id})
                    })
                setCartItem(tab)
        })
    })
    }, [newCart])

    // let idsFood = 'LGxBFt3WWGzNHDz2Qid8'
    // const handleDelete = (e) => {
    //     e.preventDefault()
    //     let target = e.target.parentElement.parentElement.getAttribute('data-id')
    //     console.log(target)

    //     let docRef = projectFirestore.doc(`/cart/LGxBFt3WWGzNHDz2Qid8/uid/`)
    //     docRef.get().then(doc => {
    //         console.log(doc.data)
    //     })
        
    // }

    const handleDelete = (e) => {
        e.preventDefault()

        let target = 'LGxBFt3WWGzNHDz2Qid8'

        projectFirestore.collection('cart').doc(target).delete()
        // let ref = projectFirestore.collection('cart')
        // let test = []
        // ref.onSnapshot((snapshot) => {
        //     snapshot.docs.forEach(doc => {
                
        //         test = doc.data()
        //         console.log(test.uid[0])
        //         if (test.uid[0] === 'GZpNeBTfek2SF3OPmZ8P') {
        //             console.log('równe')
        //         } else {
        //             console.log('nie równe')
        //         }
        
        //     })

        //     test.uid.map(xd => {
        //         console.log(xd)
        //     })
        
        // })
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
            </div>
            ))}
           
         </div> : null
         }

      </>
   
  )
}
