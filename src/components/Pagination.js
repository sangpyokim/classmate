import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {BiSearch} from 'react-icons/bi'
import SearchInput from './SearchInput';
import { collection, endAt, getDocs, limit, orderBy, query, startAt, where } from 'firebase/firestore';
import { FireStore } from '../firebase';


const Paginations = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 8px;
    &>div:hover {
        border: 1px solid ${props => props.theme.color.main};
        border-radius: 4px;
    }
    &>div>button {
        width: 60px;
        height: 35px;
        border: 1px solid ${props => props.theme.color.main};
        border-radius: 2px;
        background-color: white;
        color: ${props => props.theme.color.main};
    }
    &>div>button:hover {
        width: 58px;
        height: 33px;
        cursor: pointer;
        background-color: ${props => props.theme.color.main};
        border: 1px solid white;
        border-radius: 4px;
        color:white;
    }
    &>input {
      border: 1px solid ${props => props.theme.color.main};
      border-radius: 2px;
      height: 35px;
      width: 250px;
      padding-left: 8px;
    }
    &>input::placeholder {
      color: ${props => props.theme.color.main};
    }
    &>input:focus {
      border-color: black;
    }
`


const InputContainer = styled.form`
    width: 200px;
    height: 35px;
    margin-bottom: 4px;
`
const FormInputIcon = styled(BiSearch)`
    position:relative;
    left: 170px;
    bottom: 27px;
    font-size: 22px;
    color: ${props => props.theme.color.third};
    z-index: 8;
`
// 현재 페이지, 페이지 변경 setstate 함수, 가지고있는 페이지리스트의 최대 페이지 수, 페이지리스트 변경 함수, 검색할 게시판, 로딩변경함수
function Pagination({pagination, setPagination, article, setArticle, searchBoard, setLoading}) {
  const [ searchText, setSearchText ] = useState("")

  const getDocuments = async(e) => {
    e.preventDefault();
    if(searchText.length < 2) {
      alert('2글자 이상 적어주세요.')
      return null
    }

    const docRef = collection(FireStore, "Sunchon", `${searchBoard}`, '1')
    const q = query(docRef, where('shown', '==', true), orderBy('id', 'desc'), limit(1000))
    const querySnapshot = await getDocs(q);
    const list1 = []
    const list2 = []
    querySnapshot.forEach(doc => {
        list1.push(doc.data())
    })
    const list3 =[]
    list1.map((doc, index) => {

      if( list2.length === 19 || index + 1 === list1.length ) { // 마지막문서인것을 어찌알지? 문서의 아이디 불가능... 리스트 1의 길이! index는 0번부터 시작 index + 1 === list1.length
        if( doc.title.indexOf(searchText) === 0 || doc.contents.indexOf(searchText) === 0 ) { // 검색된것이 20개 이상일 경우
          list2.push(doc)
          list3.push(list2.slice())
          list2.length = 0
          console.log("1번")
        }else { // 검색된 것이 20개 미만인 경우
          list3.push(list2.slice())
          console.log("2번")
        }
      } else if ( doc.title.indexOf(searchText) >= 0 || doc.contents.indexOf(searchText) >= 0 ) {
        list2.push(doc)
      }

    })
    setArticle(list3)
}

  return (
    <Paginations>
      {pagination === 0 ? 
      <InputContainer autoComplete='off' onSubmit={(e) => getDocuments(e)} >
        <SearchInput placeholder={"검색어를 입력하세요."} value={searchText} onChange={setSearchText} />
        <FormInputIcon />
      </InputContainer>
      : 
      <div>
        <button onClick={() => setPagination(pagination-1)} >이전</button>
      </div>}
      {pagination === article ? <div></div> : <div><button onClick={() => setPagination(pagination+1)} >다음</button></div>}
    </Paginations>  
  )
}

export default Pagination;
