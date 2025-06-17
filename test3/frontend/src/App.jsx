import {useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

// import './App.css'

// import { set } from 'mongoose'

function App() {
  const [jokes, setjokes] = useState([])

  useEffect(()=>{
    axios.get("/api/myJokes")
    .then((response) =>{
      setjokes(response.data)
    }).catch((err) =>{
      console.log(err);
    })
  })
 
 



  return (
    <>
     <h1 className='bg-green-500 text-5xl text-white font-bold py-3'>welcome to my Joke app</h1>
     <br></br>
     <p>JOKES {jokes.length}</p>

     {
      jokes.map((joke, index) => (
        <div key={joke.id}>
          <br></br>
          <h3>{joke.question}</h3>
          <br></br>
          <p>{joke.answer}</p>
        </div>
        

      ))
     }

    </>
  )
}

export default App
