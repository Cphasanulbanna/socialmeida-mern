import React from 'react'
//PACKAGES
import { BrowserRouter as Router } from 'react-router-dom'
//IMPORTED COMPONENTS
import AppRouter from './components/routing/routers/AppRouter'
//CSS
import "../src/assets/css/style.css"

function App() {
  return (
    <Router>
      <AppRouter />
    </Router>
  )
}

export default App 