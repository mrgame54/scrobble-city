import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [backendMessage, setBackendMessage] = useState("Waiting for backend...");

  useEffect(() => {
    // Because of our proxy, this automatically goes to localhost:5000/api/test
    fetch('/api/test')
      .then(response => response.json())
      .then(data => setBackendMessage(data.message))
      .catch(error => setBackendMessage("Error connecting to backend!"));
  }, []);

  return (
    <div>
      <h1>Last.fm Visualizer</h1>
      <p>Backend Status: <strong>{backendMessage}</strong></p>
    </div>
  )
}

export default App