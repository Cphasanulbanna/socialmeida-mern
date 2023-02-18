import React from 'react'
import {Route, Routes} from "react-router-dom"

function MainRouter() {
  return (
    <Routes>
        <Route path="/*" element={<MainRouter />}/>
    </Routes>
  )
}

export default MainRouter