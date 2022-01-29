import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import RightAsides from '../components/RightAside';
import SubMenu from '../components/SubMenu';
import Timer from '../components/Timer';
import Loader from '../components/Loader';
import { FireStore } from '../firebase'
import { doc, updateDoc } from 'firebase/firestore';
import Footer from '../components/Footer'
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
    justify-content: space-between;
`
const UserWrapper = styled.div`
    display:flex;
    align-items: center;
`
const UpdateDeleteWrapper = styled.div`
    display: flex;
    align-items: center;
    &>div {
        color: ${props => props.theme.color.third};
        font-size: 12px;
        font-weight: 500;
    }
    &>div:first-child {
        margin-right: 8px;
    }
    &>div:hover {
        cursor: pointer;
    }
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
const Image = styled.img`
    margin-top: 18px;
`


const UpdateCancleButtonWrapper = styled.div`
    width: 100px;
    height: 35px;
    border: 1px solid ${props => props.theme.color.main};
    border-radius: 2px;
    background-color: white;
    color: ${props => props.theme.color.main};
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
`
const UpdateCancleButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    &:hover {
        width: 98px;
        height: 33px;
        cursor: pointer;
        background-color: ${props => props.theme.color.main};
        border: 1px solid white;
        border-radius: 4px;
        color:white;
    }
`

function FreeBoardDetail() {
    const location = useLocation() // state 값 article
    const navigate = useNavigate()
    const params = useParams()

    const [ article, setArticle ] = useState(location.state == null ? null : location.state.article)
    const [ loading, setLoading ] = useState(true)
    const [ updateToggle, setUpdateToggle ] = useState(false);


    useEffect(() => {
        if ( location.state === null ) {
            alert('잘못된 접근!')
            navigate('/')
        }   
        setLoading(false)
    },[])


    // 진정한 삭제아님 그냥 안보이게만 백업을 못해서...
    const deleteDoc = async() => {
        if( window.confirm("삭제하시겠습니까?") ) {
            const docRef = doc(FireStore, 'Sunchon', 'Free_board', '1', params.id);
            await updateDoc(docRef, {
                shown: false
            })
            alert("삭제되었습니다.")
            navigate('/free-board')
        }
    }
    
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

                        {updateToggle 
                        ? 
                            <div>
                                <Writting type={"update"} />
                                <UpdateCancleButtonWrapper onClick={() => setUpdateToggle(false)} >
                                    <UpdateCancleButton>
                                        {`< 글 수정 취소`}

                                    </UpdateCancleButton>
                                </UpdateCancleButtonWrapper>
                            </div> 
                        :
                         
                         
                        <MainContentsWrap>
                            <MainContentsUser>
                                <UserWrapper>
                                    <UserImg>
                                        ♥
                                    </UserImg>

                                    <ContentsInfo>
                                        <div>
                                            익명
                                        </div>
                                        <Timer time={article && article.date} />
                                    </ContentsInfo>
                                </UserWrapper>
                                <UpdateDeleteWrapper>
                                    <div onClick={() => setUpdateToggle(true)} >수정</div>
                                    <div onClick={() => deleteDoc()} >삭제</div>
                                </UpdateDeleteWrapper>
                            </MainContentsUser>

                            <MainContents>
                                <MainContentsTitle>
                                    {article && article.title}
                                </MainContentsTitle>
                                <MainContentsContetns>
                                    {article && article.contents}
                                    <Image src={article.image} width={'100%'} />
                                </MainContentsContetns>
                            </MainContents>

                            <MainContentsFooter>
                                footer( 좋아요, 댓글 수, 즐겨찾기 수, 좋아요버튼, 즐겨찾기 버튼)
                            </MainContentsFooter>

                            <MainContentsComment>
                                댓글들, 댓글 달기
                            </MainContentsComment>
                        </MainContentsWrap>
                        }
                    </MainContentContainer>

                    
                    <RightAsides />
                </Contents>
          </ContentContainer>
          <Footer />
      </Container>
    }
  </>
  )      

}

export default FreeBoardDetail;
