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
  const [isCancelled, setIsCancelled] = useState(false)

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


  let foodArrId = ''
  let idsFood = 'LGxBFt3WWGzNHDz2Qid8'
    data && data.map((i) => {
      foodArrId = i.uid
      idsFood = i.id
    })


  const ref = projectFirestore.collection('cart').doc(idsFood)

  const dispatchIfNotCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action)
    }
  }

  const addToCartHandler = async (e) => {
    e.preventDefault()
    let target = e.target.parentElement.parentElement.getAttribute('data-id')

    try {     
      const updateDoc = await ref.update({
          uid: [...foodArrId, target]
      })
      dispatchIfNotCancelled({ type: "ADDED_DOCUMENT", payload: updateDoc })
    } catch {

    }}
    
  return (
    <div>
         {foodData && foodData.map((foodList) => (
        <div className="food-card" key={foodList.id} data-id={foodList.id}>
            <div className="img">
            <img src={foodList.imgSrc} alt="food img" />
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
