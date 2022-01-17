import React from 'react'
import { signOut, updateCurrentUser } from 'firebase/auth'
import { Auth } from '../firebase'


function Home() {

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
