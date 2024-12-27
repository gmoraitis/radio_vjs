import { useState } from 'react'
import './App.css'
import Screen from './components/Screen'
import Info from './components/Info'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>FM-Radio</h1>
      <Screen />
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <Info />
      <footer>Created by <a href="https://gmoraitis.github.io/">Georgios Moraitis</a></footer>
    </>
  )
}

export default App
