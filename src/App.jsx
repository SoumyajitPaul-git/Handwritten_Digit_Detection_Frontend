import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import DigitRecognizer from './pages/DigitRecognizer.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <DigitRecognizer />
      </div>
    </>
  );
}

export default App
