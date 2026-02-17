import { useState, useEffect } from 'react'

function App() {
  const [message, setMessage] = useState("Loading...")

  useEffect(() => {
    // Python backend se data fetch karna
    fetch("http://127.0.0.1:8000/")
      .then((response) => response.json())
      .then((data) => {
        setMessage(data.message) // Python ne jo "message" bheja wo set karo
      })
      .catch((error) => console.error("Error:", error));
  }, [])

  return (
    <div style={{ padding: "50px", textAlign: "center" }}>
      <h1>React + FastAPI Connection</h1>
      <p>Backend says:</p>
      {/* Yahan Python ka message dikhega */}
      <h2 style={{ color: "green" }}>{message}</h2>
    </div>
  )
}

export default App