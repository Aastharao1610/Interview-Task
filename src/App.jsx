import { BrowserRouter as Router } from 'react-router-dom'
import Navbar from './Components/Navbar'
import AppRoutes from './Routes/Routes'
import './App.css'
import { useState } from 'react'

function App() {

  const [searchQuery, setSearchQuery] = useState('')


  return (
    <>
      <Router>
        <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <AppRoutes searchQuery={searchQuery} />
      </Router>
    </>
  )
}

export default App
