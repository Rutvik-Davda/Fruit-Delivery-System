import { useState,useEffect } from 'react'
import Registration from './pages/Registration'
import Login from './pages/Login'
import './App.css'
import Routing from "./routing/routing"

function App() {

  

  
 useEffect(() => {
        
        const storedValue = localStorage.getItem("cartvalue");
  if (storedValue === null) {
    localStorage.setItem("cartvalue", 0);
  }
       
      }, []);

  return (
    <>

      <Routing/>

     

    </>
  )
}

export default App










