import { collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import EmailjsAPI from '../components/EmailjsAPI';
import Footer from '../components/Footer';
import { Auth, FireStore } from '../firebase';
import{ init } from 'emailjs-com';
import { reauthenticateWithCredential, signInWithEmailAndPassword, signOut, updateEmail } from 'firebase/auth';
import FirebaseAPI from '../components/FirebaseAPI';

const Container = styled.div`
    width: 100%;
    height: 100vh;
    padding-top: 75px;
    display: flex;
    flex-direction: column;
    align-items: center;
`
const Section = styled.section`
    width: 475px;
    border-radius: 12px;
    border: 2px solid ${props => props.theme.line};
    padding: 16px;
    display: flex;
    flex-direction: column;
    margin-bottom: 8px;
`
const Title = styled.div`
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 24px;
`
const SubTitle = styled.div`

`
const InputContainers = styled.div`
    margin-top: 24px;
    width: 100%;
    &>div {
        width: 100%;
        padding: 0 8px;
        line-height: 20px;
        color: ${props => props.theme.color.second};
        display: flex;
        &>input:last-child {
            height: 40px;
            font-size: 14px;
            padding: 4px;
            border-radius: 12px;
            border:1px solid ${props => props.theme.line};
            color: ${props => props.theme.color.second};
            background-color: whitesmoke;
        }
    }
    margin-bottom: 16px;
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
const Input = styled.input`
    margin-left: 12px;
    &:hover {
        cursor: ${props => props.disabled ? null : 'pointer'}
    }
`
const EmailInput = styled.input`
    width: 100%;
    height: 40px;
    padding: 4px 8px;
    background-color: whitesmoke;
    border-radius: 12px;
    border:1px solid ${props => props.theme.line};
    font-size: 16px;
    color: ${props => props.theme.color.second};
    border-color: ${props => props.error === '' ? null : props.theme.color.blue };
    &:focus {
        background-color: white;
    }
`
const InputContainer = styled.div`
    width: 100%;
    margin-bottom: 16px;
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
const LogInButton = styled.div`
    display: flex;
    align-items:center;
    justify-content: center;
    font-size: 12px;
    border: none;
    background-color: ${props => props.theme.color.main};
    width: auto;
    height: 30px;
    border-radius: 12px;
    color: white;
    margin: 0 42%;
`

// ????????? ????????? ????????? ?????? => ????????? ??????
const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
function Email() {
    const [ currentEmail, setCurrentEmail ] = useState(Auth.currentUser.email)
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ emailToggle, setEmailToggle ] = useState(false);
    const [ titleToggle, setTitleToggle ] = useState(true);
    const [ verifyCode, setVerifyCode ] = useState('')
    const [ code, setCode ] = useState(Math.floor(1000 + Math.random() * 9000))
    const [ error, setError ] = useState('');
    const [ userData, setUserData ] = useState('')
    
    useEffect(() => {
        init("user_E56KkBDqZ7Oo5pkWObK87")
    },[])

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
        const auth = Auth 
        if ( verifyCode === code.toString() && window.confirm(`???????????? ?????????????????????????`) ) {
            updateEmail(auth.currentUser, email).then(async() => {
                const docRef = doc(FireStore, "Users_Info", auth.currentUser.uid);
                await updateDoc(docRef, {
                    id: email
                }).then(() => {
                    alert('?????? ?????????????????????!')
                    signOut(Auth)
                })
            })
        }else {
            setError("????????? ???????????????.")
        }
    }

    const Login = () => {
        signInWithEmailAndPassword(Auth, currentEmail, password).then(() => {
            setTitleToggle(false)
            setPassword('')
        }).catch(e => setError(e.message))
    }
  return (
      <Container>
          <Section>
            <Title>{titleToggle ? "?????????" : "????????? ??????"}</Title>
            <SubTitle>{titleToggle ? "?????? ???????????? ?????? ????????????!" : "???????????? ??????????????? ????????? ?????????????????? ????????????????????????."}</SubTitle>
            <InputContainers  >
                    <div ><label>?????????</label></div>
                    {titleToggle 
                    ? 
                        <div>
                            <EmailInput type={'email'} value={currentEmail} readOnly currentEmail />
                        </div>
                    : 
                    <div>
                        <EmailInput type={'email'} value={email} autoFocus readOnly={emailToggle ? true : false} onChange={e => setEmail(e.target.value)} onClick={() => setEmail(emailToggle ? email : "")} error={error} />
                        <Input type={'button'} value={"????????? ??????"} onClick={(e) => verifyEmail(e)} disabled={emailToggle ? true : false } />
                    </div>
                        }
                    
            </InputContainers>
            {titleToggle ? 
            <InputContainer  >
                <div ><label>????????????</label></div>
                <div>
                    <input type={'password'} value={password} onChange={e => setPassword(e.target.value)} onClick={() => setPassword("")} autoFocus  />
                </div>
            </InputContainer>
            : null}
            
            {emailToggle ? 
            <VerufyInput  >
                    <div ><label>???????????? (4??????)</label></div>
                    <div>
                        <input value={verifyCode} maxLength={4} onChange={e => setVerifyCode(e.target.value)} onClick={() => setVerifyCode("")} autoFocus />
                        <input type={'button'} value={"??????"} onClick={(e) => checkCode(e)} />
                    </div>
            </VerufyInput> 
            : 
            <LogInButton onClick={Login} >?????????</LogInButton>}
          <ErrorContainer>
                    <p>{error}</p>
            </ErrorContainer>
          </Section>
          <Footer />
      </Container>
  )
}

export default Email;
