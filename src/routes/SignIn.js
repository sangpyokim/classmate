import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'


//로고
const Logoo = "🇰🇷"

//바디
const Container = styled.div`
    display:flex;
    flex-direction: column;
    align-items:center;
    width:100%;
    padding: 30px 15px;
    @media ${props => props.theme.mobileM} {
        height: 100vh;
        justify-content: center;
    }
`
const Form = styled.form`
    display:flex;
    flex-direction:column;
    width:100%;
    justify-content: center;
    @media ${props => props.theme.mobileM} {
        width: 360px;

    }
`
const Logo = styled.div`
    font-size: 60px;
    margin-bottom: 15px;
    &>div {
        display: none;
    }
    @media ${props => props.theme.mobileM} {
        display: flex;
        width: 360px;
        justify-content: space-between;
        &>div {
            display: flex;
            align-items: flex-end;
            font-size: 18px;
            color: ${props => props.theme.color.third}
        }
        &>div>div {
            margin-left: 3px;
            color: ${props => props.theme.color.second};
            font-weight: 700;
        }

    }
`
const Input = styled.input`
    height: 40px;
    margin-bottom: 5px;
    border: 1px solid ${props => props.theme.line};
    padding-left: 10px;
`
const Submit = styled.input`
    height: 40px;
    border: none;
    background-color: ${props => props.theme.color.main};
    color: white;
    margin-bottom:10px;
    font-size: 16px;
`
const LabelContainer = styled.div`
    display:flex;
    align-items: center;
    justify-content: space-between;
    font-size: 12px;
    padding: 0 10px;
`
const Label = styled.label`
    color: ${props => props.theme.color.third};
`
const Regi = styled.p`
    height:50px;
    padding-top: 30px;
    font-size: 16px;
    display: flex;
    justify-content: center;
    &>span {
        color: ${props => props.theme.color.third};
        font-weight: 400;
        margin-right: 5px;
    }
    &:last-child {
        color: ${props => props.theme.color.main};
        font-weight: 700;
    }
`
const Footer = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    position:absolute;
    bottom:0px;
    width:100%;
    height:50px;
    border-top: 1px solid ${props => props.theme.line};
    background-color: whitesmoke;
    @media ${props => props.theme.mobileM} {
        height: 60px;
    };
    &>div {
        color: ${props => props.theme.color.third};
        margin: 0 5px;
    }
    &:nth-child(2n) {
        color: ${props => props.theme.color.second};
    }
`

function SignIn() {
    return (
        <Container>
            <Logo>
                <Link to={"/"} >
                    {Logoo}
                </Link>
                <div>
                    지금<div>Classmate</div>를 시작하세요!
                </div>
            </Logo>
            <Form>
                <Input placeholder='아이디' type={'text'} maxLength={20} />
                <Input placeholder='비밀번호' type={'password'} maxLength={20} />
                <Submit type={'submit'} value={"로그인"} />
                <LabelContainer>
                    <Label>
                        <input type="checkbox" value="1" />
                        로그인 유지
                    </Label>
                    <p >
                        <Link to="/forgot">아이디/비밀번호 찾기</Link>
                    </p>
                </LabelContainer>

                <Regi>
                    <span>에브리타임에 처음이신가요?</span>
                    <Link to="/register">회원가입</Link>
                </Regi>
            </Form>
            <Footer>
                <div>
                    footer
                </div>
                <div>
                    footer
                </div>
            </Footer>
        </Container>
    )
}

export default SignIn
