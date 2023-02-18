import React from 'react'
//PACKAGES
import {Routes, Route} from "react-router-dom"
//COMPONENT IMPORTS
import Home from '../../home/Home'
import Login from '../../auth/Login'
import ProfilePage from '../../profile/ProfileBox'
import Register from '../../auth/Register'

function AppRouter() {
  return (
    <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/home' element={<Home />}/>
        {/* <Route path='/profile/:userId' element={<ProfilePage />}/> */}


		
        <Route path='/register' element={<Register />}/>


    </Routes>
  )
}

export default AppRouter