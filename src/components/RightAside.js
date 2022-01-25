import React from 'react';
import styled from 'styled-components';
import SearchInput from '../components/SearchInput'
import {BiSearch} from 'react-icons/bi'

const RightAside = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 325px;
`
const InputContainer = styled.form`
    width: 100%;
    height: 40px;
    margin-bottom: 4px;
`
const FormInputIcon = styled(BiSearch)`
    position:relative;
    left: 295px;
    bottom: 30px;
    font-size: 22px;
    color: ${props => props.theme.color.third};
    z-index: 8;
`
const RightCard = styled.div`
    border: 1px solid ${props => props.theme.line};
    width: 100%;
    font-weight: 500;
    border-bottom: none;
    background-color: whitesmoke;
    margin-bottom: 4px;
    &>div {
        border-bottom: 1px solid ${props => props.theme.line};
        display: flex;
        align-items: center;
        padding-left: 8px;
        min-height: 40px;
    }
    &>div:hover {
        background-color: white;
    }
    &>div:first-child {
        color: ${props => props.theme.color.blue};
        height: 40px;
        width: 100%;
        font-weight: 700;


    }
    &>div:first-child:hover {
        background-color: whitesmoke;
    }
`

function RightAsides() {
  return (
    <RightAside>
    <InputContainer>
        <SearchInput placeholder={"전체 게시판의 글을 검색하세요!"} />
        <FormInputIcon />
    </InputContainer>
    
    <RightCard>
        <div>실시간 인기 글</div>
        <div>실시간 인기 글1</div>
        <div>실시간 인기 글2</div>
    </RightCard>

    <RightCard>
        <div>HOT 게시물</div>
        <div>실시간 인기 글1</div>
        <div>실시간 인기 글2</div>
    </RightCard>

    <RightCard>
        <div>BEST 게시판</div>
    </RightCard>
</RightAside>
  )
}

export default RightAsides;
