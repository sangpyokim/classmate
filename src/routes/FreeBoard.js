import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import RightAsides from '../components/RightAside';
import SearchInput from '../components/SearchInput';
import SubMenu from '../components/SubMenu';
import { collection, doc, getDoc, getDocs, limit, onSnapshot, orderBy, query, setDoc, where } from 'firebase/firestore'
import { Auth, FireStore, Storage } from '../firebase';
import { getDownloadURL, list, listAll, ref, uploadBytes } from 'firebase/storage';
import { useSelector } from 'react-redux';
import Timer from '../components/Timer';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../components/Loader'
import Footer from '../components/Footer';
import Pagination from '../components/Pagination'
import Writting from '../components/Writting';

const Container = styled.div`
    width: 100%;
`

const SubMenuContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-width: 1180px;
    background-color: whitesmoke;
    border-bottom: 1px solid ${props => props.theme.line};
`
const ContentContainer = styled.div`
    width: 100%;
    min-width: 1180px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 24px;
    margin-bottom: 50px;
`
const ContentsWrapper = styled.div`
    min-height: 100%;
`
const Contents = styled.div`
    display: flex;
    justify-content: space-between;
    width: 1180px;
    padding: 0px 20px;
`
const MainContentContainer = styled.div`
    width: 800px;
`
const MainContentsTitle = styled.div`
    border: 1px solid ${props => props.theme.line};
    height: 60px;
    display: flex;
    align-items: center;
    font-size: 22px;
    font-weight: 600;
    padding-left: 12px;
    margin-bottom: 4px;

`
const SearchInputContainer = styled.div`
    height: 48px;
    width: 100%;
    margin-bottom: 4px;
    &>input {
        background-color: whitesmoke;
    }    
    &>input::placeholder {
        background-color: whitesmoke;
        font-weight: 500;
        color: ${props => props.theme.color.third};
    }
`
const WritingContainer = styled.form`
    border: 2px solid ${props => props.theme.line};
    margin-bottom: 4px;
    &>input:first-child {
        border: none;
        border-bottom: 1px solid ${props => props.theme.line};
        width: 100%;
        height: 40px;
        display: flex;
        align-items: center;
        padding-left: 8px;
        font-weight: 600;
        font-size: 16px;
        color: ${props => props.theme.color.first};
    }
    &>div:last-child {
        height: 32px;
        display: flex;
        align-items:center;
        justify-content: space-between;
        padding: 0 0 0 8px;
        color: ${props => props.theme.color.third};
        &>input:last-child {
            position: relative;
            top: -1px;
            left: 2px;
            background-color: ${props => props.theme.color.main};
            height: 34px;
            width: 40px;
            border: none;
            color: white;
        }
    }
`
const Textarea = styled.textarea`
    resize: none;
    border: none;
    height: 250px;
    width: 100%;
    border-bottom: 1px solid ${props => props.theme.line};
    padding: 8px;
    color: ${props => props.theme.color.first};
`
const ImageArea = styled.div`
    height: 100px;
    width: 100%;
    display:flex;
    align-items:center;
    padding-left: 12px;
    border-bottom: 1px solid ${props => props.theme.line};
`
const MainContents = styled(Link)`
    height: 100px;
    padding: 8px;
    width: 100%;
    border: 1px solid ${props => props.theme.line};
    margin-bottom: 4px;
    display: flex;
    flex-direction:column;
    justify-content: space-evenly;
    &:hover {
        background-color: whitesmoke;
    }
`
const Article = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    padding: 4px 2px;
`

const LeftArticle = styled.div`
    color: ${props => props.theme.color.third};
    font-size: 12px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    height: 100%;
    &>div:first-child {
        font-weight: 600;
        font-size: 14px;
        color: ${props => props.theme.color.first};
    }
`
const ArticleBottom = styled.div`
    display: flex;
    font-size: 12px;
    &>div:last-child {
        margin-left: 6px;
        color: ${props => props.theme.color.first};
    }
`
const RightArticle = styled.div`
    display: flex;
    align-items: flex-end;
`
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
`

const Day = ['일요일', "월요일", "화요일", "수요일", '목요일', '금요일', '토요일' ]

function FreeBoard() {
    const [ loading, setLoading ] = useState(true);
    const [ writeToggle, setWriteToggle ] = useState(false);
    const [ article, setArticle ] = useState([])
    const [ pagination, setPagination ] = useState(0);



    // 문서 가져오기 + pagination 처음 100개 가져오고  -> pagination * 20 개만 가져오기   1 ~ 20*pagination, 앞 숫자 + 1 ~ 20*pagination
    const getDocuments = async() => {
        const docRef = collection(FireStore, "Sunchon", 'Free_board', '1')
        const q = query(docRef, where('shown', '==', true), orderBy('id', 'desc'), limit(100))
        const querySnapshot = await getDocs(q);
        const list = [];
        const ex = [];
        querySnapshot.forEach(doc => {
                // 
                console.log()
                if( ex.length === 19 || doc.data().id === 1 ) {
                    ex.push(doc.data())
                    list.push(ex.slice()) // 배열의 깊은 복사
                    ex.length= 0
                } else{ 
                    ex.push(doc.data())
                }
        })
        // 41개를 20개씩 2개 + 1개씩 1개  
        setArticle(list)
        setLoading(false)
    }

    // 100개 이상불러와졌을 때
    const test = async() => {
        const docRef = collection(FireStore, "Sunchon", 'Free_board', '1')
        const q = query(docRef , where('id', '>', '100'), where('shown', '==', true), orderBy('id', 'desc'), limit(200))
        const querySnapshot = await getDocs(q);
        const list = []
        querySnapshot.forEach(doc => {
            list.push(doc.data())
        })
        setArticle(list)
        setLoading(false)
    }

    useEffect(() => {
        getDocuments()
    }, [])
    
  return (
      <Container>
          <ContentsWrapper>
          <SubMenuContainer>
            <SubMenu />
          </SubMenuContainer>

          <ContentContainer>
              <Contents>
                <MainContentContainer>
                    <MainContentsTitle>자유게시판</MainContentsTitle>
                    
                    {
                        writeToggle
                            ?
                        <Writting type="create" />
                            :
                        <SearchInputContainer onClick={() => setWriteToggle(true)} >
                                <SearchInput placeholder='새 글을 작성해주세요!' />
                        </SearchInputContainer>

                    }

                    {
                        loading 
                        ? <Loader /> 
                        : article[pagination].map( article => ( 
                            article.shown ? 
                            <MainContents key={article.id} to={`/free-board/${article.id}`} state={{article}} >
                                <Article>
                                    <LeftArticle>
                                        <div>{article.title}</div>
                                        <div>{article.contents.substring(0, 50)}</div>

                                        <ArticleBottom>
                                            <Timer time={article.date} />
                                            <div>
                                                익명
                                            </div>
                                        </ArticleBottom>
                                    </LeftArticle>

                                    <RightArticle>
                                        <div>
                                            정보들
                                        </div>
                                        {article.image === null ? null : <img src={article.image} height={'75px'} width={'75px'} loading='lazy' />}
                                    </RightArticle>
                                </Article>
                            </MainContents>
                            : null
                        ))
                    }
                    <div >
                        <Pagination pagination={pagination} setPagination={setPagination} article={article.length-1} setArticle={setArticle} searchBoard={"Free_board"} setLoading={setLoading} />
                    </div>
                </MainContentContainer>

                <RightAsides />
              </Contents>
          </ContentContainer>
          </ContentsWrapper>
          <Footer />
      </Container>
  )
}

export default FreeBoard
