import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Main from '../routes/Main'
import SignIn from '../routes/SignIn'


function AppRouter() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path='/signin' element={<SignIn />} />
            </Routes>
        </>
    )
}

export default AppRouter
