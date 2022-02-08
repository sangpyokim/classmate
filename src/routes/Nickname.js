import {  doc, getDoc, updateDoc} from 'firebase/firestore';
import React, {  useState } from 'react';
import styled from 'styled-components';
import Footer from '../components/Footer';
import { Auth, FireStore } from '../firebase';
import { signInWithEmailAndPassword} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

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
    margin: 0 40%;
    font-weight: 600;
`
const EmailCheckContainer = styled.div`
    margin-top: 16px;
`
// 1. 로그인 -> 2. 닉네임 수정 끝! 중복검사x
function Nickname() {
    const [ currentEmail, setCurrentEmail ] = useState(Auth.currentUser.email)
    const [ password, setPassword ] = useState('');
    const [ titleToggle, setTitleToggle ] = useState(true);
    const [ error, setError ] = useState('');
    const [ nickname, setNickname ] = useState('')

    const navigate = useNavigate()

    const login = () => {
      setError('')
      signInWithEmailAndPassword(Auth, currentEmail, password).then(() => {
          setTitleToggle(false)
      }).catch(e => setError(e.message))
    }   

    const nicknameChange = async() => {
      const docRef = doc(FireStore, "Users_Info", Auth.currentUser.uid)
      const a = await getDoc(docRef)
      if(a.data().nickname === nickname ) {
        alert("현재와 다른 닉네임을 입력해주세요!")
      }else {
        await updateDoc(docRef, {
          nickname
        }).then(() => {
          alert('닉네임이 변경되었습니다!')
          navigate('/')
        })
      }
    }



  return (
      <Container>
          <Section>
            <Title>{titleToggle ? "로그인" : "닉네임 변경"}</Title>
            <SubTitle>{titleToggle ? "우선 로그인을 다시 해주세요!" : "변경하실 닉네임을 입력해주세요!"}</SubTitle>
            <InputContainers  >
                    <div ><label>{titleToggle ? "이메일" : "닉네임"}</label></div>
                    {titleToggle 
                    ? 
                        <div>
                            <EmailInput type={'email'} value={currentEmail} readOnly  />
                        </div>
                    : 
                      <div>
                        <EmailInput type={'text'} value={nickname} onChange={(e) => setNickname(e.target.value)}  />
                      </div>
                        }
                    
            </InputContainers>
            {titleToggle ? 
            <InputContainer  >
                <div ><label>비밀번호</label></div>
                <div>
                    <input type={'password'} value={password} onChange={e => setPassword(e.target.value)} onClick={() => setPassword("")} autoFocus  />
                </div>
            </InputContainer>
            : null}
            
            <ErrorContainer>
                    <p>{error}</p>
            </ErrorContainer>

            {titleToggle ? 
            <LogInButton onClick={login} >로그인</LogInButton>
            :
            <LogInButton onClick={nicknameChange} >변경하기</LogInButton>
        }
          </Section>
          <Footer />
      </Container>
  )
}

export default Nickname;
