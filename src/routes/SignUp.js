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
    const [ studentID, setStudentID ] = useState("") //not null
    const [ univ, setUniv ] = useState("");
    const [ selectedUniv, setSelectedUniv ] = useState("") // not null

    let navigate = useNavigate();


    const setState = (list) => {
        setSelectedUniv(list)
        setUniv(list)
    }

    const onSubmitVerification = (e) => {
        e.preventDefault()
        studentID.length > 0 
        ? selectedUniv.length > 0 
            ? navigate('/signup/register', {state: { studentID, selectedUniv }}) 
            : alert("????????? ???????????????!")
        : alert("????????? ???????????????!")

          
    }

    return (
        <Container>
            <Form onSubmit={e => onSubmitVerification(e)}  >
                <H2>Classmate ????????????</H2>
                <Des >Classmate ???????????? <strong>Classmate</strong>???<br />????????? ????????? ???????????? ?????? ???????????? ??? ????????????.</Des>
                <H2>?????? ??????</H2>

                <InputContainer>
                    <div ><label>????????????</label></div>

                    <select  defaultValue="" onChange={e=> setStudentID(e.target.value)} >
                        <option disabled select="" value={""} >?????? ?????? (??????)</option>
                        <option value="2022">2022??????</option>
                        <option value="2021">2021??????</option>
                        <option value="2020">2020??????</option>
                        <option value="2019">2019??????</option>
                        <option value="2018">2018??????</option>
                        <option value="2017">2017??????</option>
                        <option value="2016">2016??????</option>
                        <option value="2015">2015??????</option>
                        <option value="2014">2014??????</option>
                        <option value="2013">2013??????</option>
                        <option value="2012">2012??????</option>
                        <option value="2011">2011??????</option>
                        <option value="2010">2010??????</option>
                        <option value="2009">2009??????</option>
                        <option value="2008">2008??????</option>
                    </select>
                </InputContainer>

                <InputContainer >
                    <div >
                        <label>??????</label>
                    </div>
                    <input type="text" maxLength="20" placeholder="?????? ????????? ???????????????." autoComplete="off" value={univ} onChange={(e) => setUniv(e.target.value)} />
                </InputContainer>
                <Lists>
                    <ol>
                        { univ && UnivList.map( (list, index) => (
                            list.indexOf(univ) > -1
                              ? 
                                <li key={index} onClick={() => setState(list)} >
                                    {list}
                                </li>
                              :
                                null
                        ))}
                    </ol>
                </Lists>
                <NextButton type="submit" value="??????" />
            </Form>
        </Container>
    )
}

export default SignUp
