import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    justify-content:center;
    padding: 25px 0;
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
    &>div {
        padding: 0 8px;
        line-height: 20px;
        color: ${props => props.theme.color.second};
    }
    &>select {
        width: 100%;
        height: 40px;
        padding: 4px;
        background-color: whitesmoke;
        border-radius: 12px;
        border-color: ${props => props.theme.line};
        font-size: 16px;
        color: ${props => props.theme.color.first};
    }
    &>input {
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
const Lists = styled.ol`
    margin-top: 16px;
    margin-bottom: 12px;
    padding: 0 8px;
    line-height: 20px;
    font-size: 16px;
    color: ${props => props.theme.color.second};
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
`

function SignUp() {
    return (
        <Container>
            <Form id="container">
                <H2>Classmate 회원가입</H2>
                <Des >Classmate 계정으로 <strong>Classmate</strong>의<br />다양한 대학생 서비스를 모두 이용하실 수 있습니다.</Des>
                <H2>학교 선택</H2>

                <InputContainer>
                    <div ><label>입학년도</label></div>

                    <select name="enter_year">
                        <option disabled select="" >연도 선택 (학번)</option>
                        <option value="2022">2022학번</option>
                        <option value="2021">2021학번</option>
                        <option value="2020">2020학번</option>
                        <option value="2019">2019학번</option>
                        <option value="2018">2018학번</option>
                        <option value="2017">2017학번</option>
                        <option value="2016">2016학번</option>
                        <option value="2015">2015학번</option>
                        <option value="2014">2014학번</option>
                        <option value="2013">2013학번</option>
                        <option value="2012">2012학번</option>
                        <option value="2011">2011학번</option>
                        <option value="2010">2010학번</option>
                        <option value="2009">2009학번</option>
                        <option value="2008">2008학번</option>
                    </select>
                </InputContainer>

                <InputContainer >
                    <div >
                        <label>학교</label>
                    </div>
                    <input type="text"  maxLength="20" placeholder="학교 이름을 검색하세요." autoComplete="off" />
                </InputContainer>
                <Lists>
                    <div>학교리스트</div>
                </Lists>
                <NextButton type="submit" value="다음" />
            </Form>
        </Container>
    )
}

export default SignUp