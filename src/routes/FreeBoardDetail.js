import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import RightAsides from '../components/RightAside';
import SubMenu from '../components/SubMenu';
import Timer from '../components/Timer';
import Loader from '../components/Loader';


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
const MainTitle = styled(Link)`
    border: 1px solid ${props => props.theme.line};
    height: 60px;
    display: flex;
    align-items: center;
    font-size: 22px;
    font-weight: 600;
    padding-left: 12px;
    margin-bottom: 4px;
`
const MainContentsWrap = styled.div`
    border: 1px solid ${props => props.theme.line};

    &>div {
        padding: 12px;
    }
    
`
const MainContentsUser = styled.div`
    display: flex;
    align-items:center;
`
// img 태그로 바꿔야함
const UserImg = styled.div`
    font-size: 42px;
    margin-right: 8px;
`
const ContentsInfo = styled.div`
    color: ${props => props.theme.color.third};

    &>div:first-child {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        color: ${props => props.theme.color.first};
        font-weight: 600;
        height: 18px;
    }
`
const MainContents = styled.div``
const MainContentsTitle = styled.div`
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 16px;
`
const MainContentsContetns  = styled.div`
    color: ${props => props.theme.color.second};
    white-space: pre-wrap;
    font-size: 14px;
    line-height: 16px;
`
const MainContentsFooter = styled.div`
    border-bottom: 1px solid ${props => props.theme.line};

`
const MainContentsComment = styled.div`

`



function FreeBoardDetail() {
    const location = useLocation()
    const navigate = useNavigate()

    console.log(location)
    
    const [ article, setArticle ] = useState(location.state == null ? null : location.state.article)
    const [ loading, setLoading ] = useState(true)


    useEffect(() => {
        if ( location.state === null ) {
            alert('잘못된 접근!')
            navigate('/')
        }   
        setLoading(false)
    },[])


  return (
      <>
      {loading 
        ?
        <Loader />
         :

      <Container>
          <SubMenuContainer>
              <SubMenu />
          </SubMenuContainer>

          <ContentContainer>
                <Contents>
                    <MainContentContainer>
                        <MainTitle to={'/free-board'} >자유게시판</MainTitle>

                        <MainContentsWrap>
                            <MainContentsUser>
                                <UserImg>
                                    ♥
                                </UserImg>

                                <ContentsInfo>
                                    <div>
                                        익명
                                    </div>
                                    <Timer time={article && article.date} />
                                </ContentsInfo>
                            </MainContentsUser>

                            <MainContents>
                                <MainContentsTitle>
                                    {article && article.title}
                                </MainContentsTitle>
                                <MainContentsContetns>
                                    {article && article.contents}
                                </MainContentsContetns>
                            </MainContents>

                            <MainContentsFooter>
                                footer( 좋아요, 댓글 수, 즐겨찾기 수, 좋아요버튼, 즐겨찾기 버튼)
                            </MainContentsFooter>

                            <MainContentsComment>
                                댓글들, 댓글 달기
                            </MainContentsComment>
                        </MainContentsWrap>
                    </MainContentContainer>

                    
                    <RightAsides />
                </Contents>
          </ContentContainer>
      </Container>
    }
  </>
  )      

}

export default FreeBoardDetail;
