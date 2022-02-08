import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { UnivList } from '../components/UnivList'

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
const ToggleContainer = styled.div`
    margin-top: 8px;
    margin-bottom: 16px;
    margin-top: 20px;
    display: flex;

`
const Toggle = styled.div`
    font-size: 16px;
    padding-bottom: 8px;
    color: ${props => props.toggle ? props.theme.color.main : props.theme.color.third};
    font-weight: ${props => props.toggle ? '700' : '500'};
    border-bottom: 2px solid ${props => props.toggle ? props.theme.color.main : 'tranperant'};
    margin-right: 12px;
`
const InputContainer = styled.div`
    margin-bottom: 12px;
    &>input {
        margin-bottom: 12px;
        width: 100%;
        height: 40px;
        padding: 4px 8px;
        background-color: whitesmoke;
        border-radius: 12px;
        border:1px solid ${props => props.theme.line};
        font-size: 16px;
        color: ${props => props.theme.color.second};
    }
    &>input:focus{
        background-color:white;
    }
`

const NextButton = styled.input`
    width: 100%;
    height: 40px;
    background-color: ${props => props.theme.color.main};
    border-radius: 12px;
    border: none;
    color: white;
    font-size: 16px;
    font-weight: 700;
    &:hover {
        cursor: pointer;
    }
`


// 1. 이메일 찾기: 이름 학교 학번으로 찾기,  2. 비밀번호 찾기: 이메일 인증으로 찾기 2-1. 이메일 인증 버튼 누르면 이메일 인증 창 생기고 비밀번호찾기로 버튼 value바뀜
function SignUp() {
    let navigate = useNavigate();
    
    const [ toggle, setToggle ] = useState(true)
    const [ name, setName ] = useState('')
    const [ univ, setUniv ] = useState('')
    const [ sId, setSId ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ passwordToggle, setPasswordToggle ] = useState(true)

    const onSubmit = (e) => {
        e.preventDefault()
        const type =  e.target.children[3].name
        if (type === 'email') {

        }else if ( type === 'verify' ) {

            return setPasswordToggle(false)
        }else {

        }
    }

    return (
        <Container>
            <Form onSubmit={e => onSubmit(e)}  >
                <H2>{toggle ? "Classmate 이메일 찾기" : "Classmate 비밀번호 찾기"}</H2>

                <ToggleContainer>
                    <Toggle toggle={toggle} onClick={() => setToggle(true)} >이메일 찾기</Toggle>
                    <Toggle toggle={!toggle} onClick={() => setToggle(false)}  >비밀번호 찾기</Toggle>
                </ToggleContainer>

                {toggle ? 
                <InputContainer>
                    <input type={'text'} placeholder='가입된 이름' value={name} onChange={e => setName(e.target.value)} autoFocus />
                    <input type={'text'} placeholder='가입된 학교' value={univ} onChange={e => setUniv(e.target.value)} />
                    <input type={'text'} placeholder='가입된 학번' value={sId} onChange={e => setSId(e.target.value)} />
                </InputContainer>                
                :
                <InputContainer>
                    <input type={'text'} placeholder='가입된 이메일' value={email} onChange={e => setEmail(e.target.value)} autoFocus />
                </InputContainer>}

                {toggle ?
                <NextButton type="submit" name='email' value="이메일 찾기"  />
                :
                <NextButton type="submit" name={passwordToggle ? 'verify' : 'password'} value={passwordToggle ? "이메일 인증하기" : "비밀번호 찾기" } />}
            </Form>
        </Container>
    )
}

export default SignUp
