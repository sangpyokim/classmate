import React, { useEffect, useState } from 'react'
import { Routes, Route, Navigate, } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { Auth } from '../firebase'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../redux/features/user/User'

//components
import Loader from './Loader'
import Header from './Header'
// main_pages
import Main from '../routes/Main'
import SignIn from '../routes/SignIn'
import SignUp from '../routes/SignUp'
import Forgot from '../routes/Forgot'
// home_pages
import Home from '../routes/Home'
import Register from '../routes/Register'
import Search from '../routes/Search'
import FreeBoard from '../routes/FreeBoard'
import FreeBoardDetail from '../routes/FreeBoardDetail'
import SecretBoard from '../routes/SecretBoard'
//timetale
import TimeTable from '../routes/TimeTable'





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
                <>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/free-board" element={<FreeBoard />} />
                    <Route path='/free-board/:id' element={<FreeBoardDetail />} />
                    <Route path="secret-board" element={<SecretBoard />} />
                    <Route path='time-table' element={<TimeTable />} />
                    <Route path="*" element={<Navigate to={"/"} />} />
                </Routes>
                </>
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
