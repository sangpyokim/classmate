import React, { useEffect } from 'react'
import { signOut, updateCurrentUser } from 'firebase/auth'
import { Auth } from '../firebase'
import { useSelector } from 'react-redux'


function Home() {
    const user = useSelector( state => state.user.value)
    
    useEffect(() => {
        console.log(Auth.currentUser)
        
    }, [])

    const onClicksignOut = () => {
        Auth.signOut()
    }
    return (
        <div>
            Home
            <button onClick={() => onClicksignOut()} >logout</button>
        </div>
    )
}

export default Home
