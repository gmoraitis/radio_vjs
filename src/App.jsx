import React from 'react'
import { useState } from 'react'
import './App.css'
import Screen from './components/Screen'
import Info from './components/Info'


function App() {
  const[info, setInfo] = useState(false);

  const handleInfoToggle = () => {
    setInfo(!info);
  }

  return (
    <>
      <h1>FM-Radio</h1>
      <Screen onInfoToggle={handleInfoToggle} /> {/* Pass toggle function */}
      {info && <Info />} {/* Conditional rendering */}
      <footer>Created by <a href="https://gmoraitis.github.io/">Georgios Moraitis</a></footer>
    </>
  )
}

export default App
