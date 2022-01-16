import React from 'react'
import { Routes, Route } from 'react-router-dom'

// main_pages
import Main from '../routes/Main'
import SignIn from '../routes/SignIn'
import SignUp from '../routes/SignUp'
import Forgot from '../routes/Forgot'


function AppRouter() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path='/signin' element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/forgot" element={<Forgot />} />
            </Routes>
        </>
    )
}

export default AppRouter
