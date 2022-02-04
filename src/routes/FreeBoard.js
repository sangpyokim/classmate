import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import RightAsides from '../components/RightAside';
import SearchInput from '../components/SearchInput';
import SubMenu from '../components/SubMenu';
import { collection, getDocs, limit, orderBy, query, where } from 'firebase/firestore'
import { FireStore } from '../firebase';
import Timer from '../components/Timer';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader'
import Footer from '../components/Footer';
import Pagination from '../components/Pagination'
import Writting from '../components/Writting';
import FirebaseAPI, { readDocuments } from '../components/FirebaseAPI';
import { useSelector } from 'react-redux';

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
const Status = styled.div`
    display: flex;
    align-items: center;
    align-items: flex-end;
    height: 75px;
    opacity: 0.9;
    &>div {
        margin-right: 4px;
        font-size: 12px;
        font-weight: 600;
        white-space: pre;
        color: black;
    }
    &>div:first-child {
        font-size: 10px;
    }
`
const Heart = styled.div`
    display: flex;
    align-items: center;
    line-height: 12px;
    font-size: 10px;
    &>div{
        margin-left: 4px;
        font-size: 12px;
        color: ${props => props.theme.color.main};
    }
`
const Piture = styled.div`
        display: flex;
    font-size: 10px;
    &>div {
        margin-left: 4px;
        font-size: 12px;
        color: #29ae74;
        font-weight: 600;
    }
`
const ArticleComment = styled.div`
    display: flex;
`
const ArticleImg =styled.img`
    border-radius: 4px;
`


function FreeBoard() {
    const [ loading, setLoading ] = useState(true);
    const [ writeToggle, setWriteToggle ] = useState(false);
    const [ article, setArticle ] = useState([])
    const [ pagination, setPagination ] = useState(0);

    const isMounted = useRef(false)

    const user = useSelector( state => state.user.value)
    
    useEffect(() => {
        isMounted.current = true
        if (FirebaseAPI.readDocuments(user, 'free-board', 100, setArticle, isMounted) ) {
            setLoading(false)
        }

        return () => isMounted.current = false
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
                        <Writting type="create"  board={"free-board"} boardName={"자유게시판"} />
                            :
                        <SearchInputContainer onClick={() => setWriteToggle(true)} >
                                <SearchInput placeholder='새 글을 작성해주세요!' />
                        </SearchInputContainer>

                    }

                    {
                        loading 
                        ? <Loader /> 
                        : article.length >= 1 && article[pagination].map( article => ( 
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
                                        <Status>
                                        {article.image === null ? null : 
                                            <Piture>
                                                🖼️
                                                <div>
                                                    1
                                                </div>
                                            </Piture>}

                                            <Heart>
                                                ❤️
                                                <div>{article && article.heart == null ? 0 : article.heart.length}</div>
                                            </Heart>
                                            <ArticleComment>🗨 {article && article.comment == null ? 0 : 
                                                <div>{article.comment.length}</div>}
                                            </ArticleComment>
                                        </Status>
                                        {article.image === null ? null : <ArticleImg src={article.image} height={'75px'} width={'75px'} loading='lazy' />}
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
