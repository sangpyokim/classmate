import React, { useEffect, useState } from 'react'
import { Routes, Route, Navigate, } from 'react-router-dom'
import { onAuthStateChanged, signOut } from 'firebase/auth'
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
import BoardDetail from '../routes/BoardDetail'
import SecretBoard from '../routes/SecretBoard'
//timetale
import TimeTable from '../routes/TimeTable'
import RightAside from './RightAside'
import styled from 'styled-components'
import Footer from './Footer'
import My from '../routes/My'
import Email from '../routes/Email'
import Password from '../routes/Password'
import ProfileChange from '../routes/ProfileChange'
import Nickname from '../routes/Nickname'
import Chatting from '../routes/Chatting'



const AppRouterContainer = styled.div`

`



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
                    <Route path='/free-board/:id' element={<BoardDetail />} />
                    <Route path="/secret-board" element={<SecretBoard />} />
                    <Route path="/secret-board/:id" element={<BoardDetail />} />
                    <Route path='/time-table' element={<TimeTable />} />
                    <Route path='my' element={<My />} />
                    <Route path='/my/email' element={<Email />} />
                    <Route path='/my/password' element={<Password />} />
                    <Route path='/my/profile' element={<ProfileChange />} />
                    <Route path="/my/nickname" element={<Nickname />} />
                    <Route path='chat' element={<Chatting />} />
                    <Route path="*" element={<Navigate to={"/"} />} />
                </Routes>
                </>
                :
                
            <>
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path='/signin' element={<SignIn />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/signup/register" element={<Register />} />
                    <Route path="/forgot" element={<Forgot />} />
                    <Route path="*" element={<Navigate to={"/"} />} />
                </Routes>
            </>
        }
        </>
    )
}

export default AppRouter
