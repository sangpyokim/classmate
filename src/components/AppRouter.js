import React, { useEffect, useState } from 'react'
import { Routes, Route, Navigate, } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { Auth } from '../firebase'


import Loader from './Loader'

// main_pages
import Main from '../routes/Main'
import SignIn from '../routes/SignIn'
import SignUp from '../routes/SignUp'
import Forgot from '../routes/Forgot'
// home_pages
import Home from '../routes/Home'
import Register from '../routes/Register'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../redux/features/user/User'






function AppRouter() {
    const [ isloggedIn, setIsloggedIn ] = useState(false)
    const [ loading, setLoading ] = useState(true)
    
    const dispatch = useDispatch()

    useEffect(() => {
        onAuthStateChanged(Auth, (user) => {
            if (user) {
                dispatch(setUser(user.uid))

                setIsloggedIn(true)
                
                setLoading(false)
              } else {
                setLoading(true)

                setIsloggedIn(false)

                setLoading(false)

              }
        })
    }, [])


    return (
        <>
        {loading   
          ? 
          <Loader />
          :
            isloggedIn 
                ?
                <Routes>
                <Route path="/" element={<Home />} />
                <Route path="*" element={<Home />} />
                </Routes>
                :
                
                <Routes>
                <Route path="/" element={<Main />} />
                <Route path='/signin' element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/signup/register" element={<Register />} />
                <Route path="/forgot" element={<Forgot />} />
                <Route path="*" element={<Navigate to={"/"} />} />

            </Routes>
            
        }
        </>
    )
}

export default AppRouter
