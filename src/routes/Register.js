import React, { useEffect } from 'react'
import { Auth, FireStore } from '../firebase'
import { collection, setDoc, doc } from "firebase/firestore";
import { useNavigate, useLocation } from 'react-router-dom';
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

function Register() {
    const { state } = useLocation()
    const navigate = useNavigate()

    // 회원가입하면 userID를 리덕스에서 꺼내와서 컬렉션의 문서의 아이디로 지정하고 회원가입 정보들을 데이터베이스에 저장함.
    const userID = "Lhb9ER2zehTydGcOI6cJAVpE4dq2"
    const onClicks = async() => {
            await setDoc(doc(FireStore, "Users_Info", userID), {
                name: "Los Angeles",
                state: "CA",
                country: "USA"
              });
    }

    const checkState = () => {
        if (state === null) {
            alert('잘못된 접근')
            navigate('/')
        }
    }

    useEffect(() => {
        checkState()
    })


    return (
        <div>
            Register
        </div>
    )
}

export default Register
