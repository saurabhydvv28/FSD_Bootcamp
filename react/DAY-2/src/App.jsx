import React, { useState } from 'react'
import Home from './Home'

const App = () => {
  const [count, setCount] = useState(10)

  const increaseCount = () => {
    setCount(prev => prev + 1)
  }

  const decreaseCount = () => {
    setCount(prev => prev - 1)
  }

  const resetCount = () => {
    setCount(10)
  }

  return (
    <>
      <div>App</div>

      <h1>{count}</h1>

      <button onClick={increaseCount}>Increase</button>
      <button onClick={decreaseCount}>Decrease</button>
      <button onClick={resetCount}>Reset</button>

      <Home />
    </>
  )
}

export default App
