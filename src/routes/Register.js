import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import emailjs from 'emailjs-com'
import { collection, doc, getDoc, getDocs, limit, orderBy, query, setDoc, where } from "firebase/firestore";
import { Auth, FireStore } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import EmailjsAPI from '../components/EmailjsAPI';



const Container = styled.div`
    display: flex;
    justify-content: center;
    height: auto;
    padding: 25px 0;
    @media (max-width: 480px) {
        padding: 0px;
        &>form {
            border: none;
        }
    }

    -ms-user-select: none; 
        -moz-user-select: -moz-none; 
        -webkit-user-select: none; 
        -khtml-user-select: none; 
        user-select:none;
`
const Form = styled.form`
    width:480px;
    padding: 25px;
    border: 1px solid ${props => props.theme.line};
    border-radius: 12px;

`
const H2 = styled.h2`
    font-size: 22px;
    line-height: 30px;
    font-weight:700;
    color: ${props => props.theme.color.first};
`
const Des = styled.p`
    margin-top: 8px;
    color: ${props => props.theme.color.third};
    line-height: 20px;
    margin-bottom: 48px;
    &>strong{
        color: black;
        font-weight: 700;
    }
`

const InputContainer = styled.div`
    margin-top: 24px;
    width: 100%;
    &>div {
        padding: 0 8px;
        line-height: 20px;
        color: ${props => props.theme.color.second};
        display: flex;
    }
    &>div>input {
        width: 100%;
        height: 40px;
        padding: 4px 8px;
        background-color: whitesmoke;
        border-radius: 12px;
        border:1px solid ${props => props.theme.line};
        font-size: 16px;
        color: ${props => props.theme.color.second};
    }
    &>div>input:focus{
        background-color:white;
    }

`
const InputContainers = styled.div`
    margin-top: 24px;
    width: 100%;
    &>div {
        padding: 0 8px;
        line-height: 20px;
        color: ${props => props.theme.color.second};
        display: flex;
        &>input:last-child {
            width: auto;        
            height: 40px;
            font-size: 14px;
            margin-left: 16px;
            padding: 4px;
            border-radius: 12px;
            border:1px solid ${props => props.theme.line};
            color: ${props => props.theme.color.second};
            background-color: whitesmoke;
        }
    }
    margin-bottom: 16px;
`
const NextButton = styled.div`
    width: 100%;
    height: 40px;
    background-color: ${props => props.theme.color.main};
    border-radius: 12px;
    border: none;
    color: white;
    font-size: 16px;
    font-weight: 700;
    margin-top: 36px;
    display: flex;
    align-items:center;
    justify-content: center;
`
const VerufyInput = styled.div`
    width: 50%;
    margin-bottom: 20px;
    &>div {
        padding: 0 8px;
        line-height: 20px;
        color: ${props => props.theme.color.second};
        display: flex;
    }
    &>div>input {
        width: 100px;
        height: 40px;
        padding: 4px 8px;
        background-color: whitesmoke;
        border-radius: 12px;
        border:1px solid ${props => props.theme.line};
        font-size: 16px;
        color: ${props => props.theme.color.second};
    }
    &>div>input:last-child {
        width: auto;
        margin-left: 10px;
    }
    &>div>input:focus{
        background-color:white;
    }
`
const ErrorContainer = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    margin-top: 8px;
    &>p {
        font-size: 16px;
        font-weight: 600;
        color: ${props => props.theme.color.blue};
    }
`
const Email = styled.input`
    width: 100%;
    height: 40px;
    padding: 4px 8px;
    background-color: whitesmoke;
    border-radius: 12px;
    border:1px solid ${props => props.theme.line};
    font-size: 16px;
    color: ${props => props.theme.color.second};
    border-color: ${props => props.error === "" ? null : props.theme.color.blue };
    &:focus {
        background-color: white;
    }
`
const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


function SignUp() {
    const [ email, setEmail ] = useState("") //not null
    const [ password1, setPassword1 ] = useState('')
    const [ password2, setPassword2 ] = useState('')
    const [ emailToggle, setEmailToggle ] = useState(false)
    const [ passwordToggle, setPasswordToggle ] = useState(false)
    const [ code, setCode ] = useState(Math.floor(1000 + Math.random() * 9000))
    const [ verifyCode, setVerifyCode ] = useState('')
    const [ name, setName ] = useState('')
    const [ nickname, setNickName] = useState('')
    const [ error, setError ] = useState('')


    let navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        emailjs.init("user_E56KkBDqZ7Oo5pkWObK87")
    },[])

    useEffect(() => {
        setError("")
        if( password1 != password2 ) {
            setError("??????????????? ??????????????????!")
        }
    }, [password2])

    const verifyEmail = async(e) => {
        e.preventDefault();
        setError('')
        //????????? ???????????????
        if ( email == '' || !re.test(email)) {
            return setError("???????????? ??????????????????!")
        }
        // ????????????
        const docRef = await getDocs(collection(FireStore, "Users_Info"))
        const list = []
        docRef.forEach( doc => list.push(doc.data().id))
        if ( list.some(list => list === email) ) {
            return setError("????????? ??????????????????!")
        }else {
            setEmailToggle(true)
            EmailjsAPI.sendEmail(code, email)
        }
    }
    
    const checkCode = (e) => {
        e.preventDefault();
        setError("")
        if ( verifyCode === code.toString() ) {
            setPasswordToggle(true)
        }else {
            setError("????????? ???????????????.")
        }
    }


    const onSubmit = async() => {
        if( name === '' ) {
            setError("????????? ??????????????????!")
        }else if ( nickname === '' ) {
            setError("???????????? ??????????????????!")
        }else if(error === '') {
            createUserWithEmailAndPassword(Auth, email, password1)
                .then( async(uid) => {
                    await setDoc(doc(FireStore, 'Users_Info', uid.user.uid), {
                        id: email,
                        password: password1,
                        name,
                        nickname,
                        studentId: location.state.studentID,
                        univ: location.state.selectedUniv
                    })
                }).then(res => alert("??????????????? ?????????????????????."))
        }
    }


    return (
        <Container>
            <Form  >
                <H2>Classmate ????????????</H2>
                <Des >Classmate ???????????? <strong>Classmate</strong>???<br />????????? ????????? ???????????? ?????? ???????????? ??? ????????????.</Des>
                <H2>?????? ??????</H2>
                <InputContainers  >
                    <div ><label>?????????</label></div>
                    <div>
                        <Email type={'email'} value={email} autoFocus readOnly={emailToggle ? true : false} onChange={e => setEmail(e.target.value)} onClick={() => setEmail("")} error={email} />
                        <input type={'button'} value={"????????? ??????"} onClick={(e) => verifyEmail(e)} disabled={emailToggle ? true : false } />
                    </div>
                    
                </InputContainers>

                { emailToggle ? 
                <VerufyInput  >
                    <div ><label>???????????? (4??????)</label></div>
                    <div>
                        <input value={verifyCode} autoFocus maxLength={4} readOnly={passwordToggle ? true : false} onChange={e => setVerifyCode(e.target.value)} onClick={() => setVerifyCode("")} />
                        <input type={'button'} value={"??????"} onClick={(e) => checkCode(e)} disabled={passwordToggle ? true : false } />
                    </div>
                </VerufyInput>
                : null}

                { passwordToggle ?
                <>
                    <InputContainer  >
                        <div ><label>????????????</label></div>
                        <div>
                            <input type={'password'} value={password1} onChange={e => setPassword1(e.target.value)} onClick={() => setPassword1("")}  />
                        </div>
                    </InputContainer>

                    <InputContainer  >
                        <div ><label>???????????? ??????</label></div>
                        <div>
                            <input  type={'password'} value={password2} onInput={e => setPassword2(e.target.value)} onClick={() => setPassword2("")}  />
                        </div>
                    </InputContainer>

                <InputContainer  >
                        <div ><label>??????</label></div>
                        <div>
                            <input type={'text'} value={name} onChange={e => setName(e.target.value)} />
                        </div>
                    </InputContainer>
                <InputContainer  >
                        <div ><label>?????????</label></div>
                        <div>
                        <input type={'text'} value={nickname} onChange={e => setNickName(e.target.value)} />
                        </div>
                    </InputContainer>
                </>
                : null}
                <ErrorContainer>
                    <p>{error}</p>
                </ErrorContainer>

                <NextButton onClick={onSubmit} >??????</NextButton>
            </Form>
        </Container>
    )
}

export default SignUp
