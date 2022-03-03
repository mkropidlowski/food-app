import React, { useReducer, useState, useEffect } from 'react'
import { projectFirestore } from '../firebase/config'
import './Food.css'

let initialState = {
  foodId: null
}

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case "ADDED_DOCUMENT":
      return {success: true, isPending: false, error: null, document: action.payload}
    default:
      return state
  }
}

export default function Food({foodData}) {
  const [response, dispatch] = useReducer(firestoreReducer, initialState)
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [added, setAdded] = useState()
  const [isCancelled, setIsCancelled] = useState(false)
  const [showElement, setShowElement] = useState(true)

  useEffect(()=>{
    setTimeout(()=> {
      setShowElement(false)
         }, 3000);
       },
   [])

  useEffect(() => {
    let ref = projectFirestore.collection('cart')

    const unsub = ref.onSnapshot((snapshot) => {
        let result = []
        snapshot.docs.forEach(doc => {
            result.push({ ...doc.data(), id: doc.id})
    
        })
    
        setData(result)
        setError(null)
    }, (error) => {
        setError('Brak danych.')
    })


    return () => unsub()

}, [])


  const dispatchIfNotCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action)
    }
  }

  const addToCartHandler = async (e) => {
    e.preventDefault()

    setAdded('Dodano do koszyka')

    let target = e.target.parentElement.parentElement.getAttribute('data-id')
    const ref = projectFirestore.collection('cart').doc(`${target}`)
  
    try {     
      const updateDoc = await ref.set({
          
      })
      dispatchIfNotCancelled({ type: "ADDED_DOCUMENT", payload: updateDoc })
    } catch {
      console.log(error)
    } 
    
    
    

  }

  const errorHandler = () => {
    setAdded(null)
  }
  
    
  return (
    <div>
    
      {
      added && 
      ( <div className="notification" onClick={errorHandler}>{added}<span className="notification-close">x</span></div> 
      )} 
    

     
         {foodData && foodData.map((foodList) => (
        <div className="food-card" key={foodList.id} data-id={foodList.id}>
            <div className="img">
            <img src={foodList.imgSrc} alt="food img" className="img-size"/>
            </div>
            <div className="food-details">
              <h2 className="food-details__text">{foodList.text}</h2>
              <p className="food-details__desc">{foodList.desc}</p>
              <p className="food-details__price">Cena: {foodList.price} zł</p>
              <button className="add-to-cart" onClick={addToCartHandler}>Dodaj do koszyka</button>
            </div>
        </div>
        
      ))}

    </div>
  )



}
