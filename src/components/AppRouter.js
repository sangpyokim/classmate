import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Main from '../routes/Main'


function AppRouter() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Main />} />
            </Routes>
        </>
    )
}

export default AppRouter
