import React from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import {useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { projectFirestore } from '../firebase/config';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

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
      "text": "Makarony",
      "link": "/menu"
    },
    {
      "text": "Pierogi",
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
  const [data, setData] = useState('')
  const [error, setError] = useState(null)

  const handleClick = (e) => {
    e.preventDefault()
    setFoodName(e.target.innerText.toLowerCase())
    
  }
  const menuListArray = menuList.map((content, i) => {
    return (
      <Tab component={ Link } to={`${content.link}`} key={i} label={`${content.text}`} onClick={handleClick}/>
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
          setError('Brak danych.')
      })


      return () => unsub()

  }, [menuListArray])
  
  return (
    <Container maxWidth="sm">
       <Box sx={{bgcolor: 'background.paper' }}>
      <Tabs
        value={0}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
      >
        {menuListArray}
      </Tabs>
    </Box>

    <div>
      {data && data.map((foodList, i) => (
      
    <Card sx={{ maxWidth: 320 }} key={i}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="150"
          image={foodList.imgSrc}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {foodList.text}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {foodList.desc}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {foodList.price} zł.
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Dodaj
        </Button>
      </CardActions>
    </Card>
      ))}
    </div>


    </Container>
  )
}
