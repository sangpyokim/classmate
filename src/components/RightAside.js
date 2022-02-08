import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import SearchInput from '../components/SearchInput'
import {BiSearch} from 'react-icons/bi'
import { collection, doc, getDoc, getDocs, limit, orderBy, query, where } from 'firebase/firestore';
import { FireStore } from '../firebase';
import { useNavigate } from 'react-router-dom';
import DDay from './DDay';
import FirebaseAPI from './FirebaseAPI';
import { useSelector } from 'react-redux';

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
    &>div:first-child {
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
const Card = styled.div`
    border: 1px solid ${props => props.theme.line};
    width: 100%;
    font-weight: 500;
    background-color: whitesmoke;
    display: flex;
    align-items:center;
    justify-content: space-between;
    height: 40px;
    padding: 8px;
    color: ${props => props.theme.color.blue};
    font-weight: 700;
    margin-bottom: 4px;
    &:hover {
        cursor: pointer;
    }
    &>div:last-child {
        font-size: 12px;
        color: ${props =>props.theme.color.third};
        font-weight: 400;
    }
`
const PopulstListContainer = styled.div`
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    width: 100%;
    border-bottom: 1px solid ${props => props.theme.line};
    padding: 12px;
    padding-bottom: 8px;
    &:hover {
        cursor: pointer;
    }
`
const PopulstListTitle = styled.div`
    margin-bottom: 10px;
    color: ${props => props.theme.color.first};
    font-weight: 600;
`
const PopulstListContents = styled.div`
    font-size: 12px;
    color: ${props => props.theme.color.second};
    font-weight: 500;
    margin-bottom: 8px;
    opacity:0.9;
    white-space: pre-wrap;
`
const PopulstListStatusContainer = styled.div`
    display: flex;
    font-size: 10px;
    color: ${props => props.theme.color.third};
    font-weight: 700;
`
const PopulstListBoardName = styled.div`
    margin-right: 4px;
    opacity: 0.8;
`
const Heart = styled.div`
    display: flex;
    margin-right: 4px;
    &>div{
        font-size: 12px;
        margin-left: 4px;
    }
`
const ArticleComment = styled.div`
    display: flex;
    font-size: 12px;
    margin-right: 4px;
    &>div{
        margin-left: 4px;
    }
`

function RightAsides() {
    const [ popularList, setPopularList ] = useState()
    const navigate = useNavigate()

    const user = useSelector(state => state.user.value)

    const isMounted = useRef(false)
    useEffect(async() => {
        isMounted.current = true
        const docRef = doc(FireStore, "Users_Info", user);
        const docSnap = await getDoc(docRef);
        FirebaseAPI.getTodayPopularList(docSnap.data().univ, setPopularList, isMounted) 

        return () => isMounted.current = false
    }, [])

    const onClickGoToList = async(article) => {
        if (article.board === '자유게시판') {
            navigate(`/free-board/${article.id}`, {state: {article}})
        }
    }

  return (
    <RightAside>
    <InputContainer>
        <SearchInput placeholder={"전체 게시판의 글을 검색하세요!"} />
        <FormInputIcon />
    </InputContainer>
    
    <RightCard>
        <div>실시간 인기 글</div>
        {popularList && popularList.map( list => (
            <PopulstListContainer key={list.id} onClick={() => onClickGoToList(list)} >
                <PopulstListTitle>
                    {list.title}
                </PopulstListTitle>

                <PopulstListContents>
                    {list.contents.length >= 50 ? `${list.contents.slice(0, 50)}...` : list.contents.slice(0, 50) }
                </PopulstListContents>

                <PopulstListStatusContainer>
                    <PopulstListBoardName>
                        {list.board}
                    </PopulstListBoardName>
                    <Heart>
                        ❤️
                        <div>{list && list.heart == null ? 0 : list.heart.length}</div>
                    </Heart>
                    <ArticleComment>🗨 {list && list.comment == null ? 0 : 
                        <div>{list.comment.length}</div>}
                    </ArticleComment>
                </PopulstListStatusContainer>
            </PopulstListContainer>
        ))}
    </RightCard>

    <Card>
        <div>HOT 게시물</div>
        <div>더보기</div>
    </Card>

    <Card>
        <div>BEST 게시판</div>
        <div>더보기</div>
    </Card>
</RightAside>
  )
}

export default RightAsides;
