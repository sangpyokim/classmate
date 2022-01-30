import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import RightAsides from '../components/RightAside';
import SubMenu from '../components/SubMenu';
import Timer from '../components/Timer';
import Loader from '../components/Loader';
import { FireStore } from '../firebase'
import { arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore';
import Footer from '../components/Footer'
import Writting from '../components/Writting';
import { useSelector } from 'react-redux';
import Comments from '../components/Comments';


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
const Article = styled.div`
    width: 100%;
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
const UserImg = styled.img`
    margin-right: 8px;
    width: 42px;
    border-radius: 8px;
`
const UserImgContainer = styled.div`

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
    display: flex;
    flex-direction: column;
`
const MainContentsFooter = styled.div`
    border-bottom: 1px solid ${props => props.theme.line};

`
const MainContentsComment = styled.form`
    display: flex;
    justify-content: space-between;
`
const CommentInput = styled.input`
    height: 40px;
    background-color: whitesmoke;
    width: 100%;
    padding-left: 10px;
    border: none;
`
const CommentSubmit = styled.input`
    width: 44px;
    height: 40px;
    border: none;
    background-color: ${props => props.theme.color.main};
    color: white;
    &:hover {
        cursor: pointer;
        height: 38px;
        width: 42px;
        border: 1px solid white;
        background-color: white;
        color: ${props => props.theme.color.main};
        font-weight: 600;
    }
`
const CommentSubmitContainer = styled.div`
    height: 100%;
    height: 40px;
    display: flex;
    align-items:center;
    justify-content:center;
    &:hover {
        border: 1px solid ${props => props.theme.color.main};
    }
`

const Image = styled.img`
    margin-top: 28px;
    max-width: 100%;
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

const Day = ['일요일', "월요일", "화요일", "수요일", '목요일', '금요일', '토요일' ]

function FreeBoardDetail() {
    const location = useLocation() // state 값 article
    const navigate = useNavigate()
    const params = useParams()
    const user = useSelector( state => state.user.value);

    const [ article, setArticle ] = useState(location.state == null ? null : location.state.article)
    const [ loading, setLoading ] = useState(true)
    const [ updateToggle, setUpdateToggle ] = useState(false);
    const [ userData, setUserData] = useState()
    const [ comment, setComment ] = useState('')

    const getUserInfo = async () => {
        const docRef = doc(FireStore, "Users_Info", user);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setUserData(docSnap.data());
          } else {
            // doc.data() will be undefined in this case
            alert("잘못된 접근!");
          }
    }

    useEffect(() => {
        if ( location.state === null ) {
            alert('잘못된 접근!')
            navigate('/')
        }   
        getUserInfo()
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
    
    const onSubmitComment = async(e) => {
        e.preventDefault()
        const docRef = doc(FireStore, 'Sunchon', 'Free_board', '1', params.id);
        const docs = await getDoc(docRef) 

        const dat = new Date()
        const currentDate = `${dat.getFullYear()}년 ${dat.getMonth()+1}월 ${dat.getDate()}일 ${dat.getHours()}시 ${dat.getMinutes()}분 ${dat.getSeconds()}초 ${Day[dat.getDay()]} `

        updateDoc(docRef, {
            comment: arrayUnion({
                id: docs.data().comment == undefined ? 1 : docs.data().comment.length + 1,
                comment,
                uid: user,
                user: userData,
                date: currentDate,
                shown: true,
                heart: [],
            })
        })
        setComment('')
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
                                    <UserImgContainer>
                                        {article.image == null ? <UserImg src="https://firebasestorage.googleapis.com/v0/b/classmate-e.appspot.com/o/default_image.png?alt=media&token=c2ca3608-9fea-4021-82f7-bb5640bbbba9" /> : <UserImg src={article.image} width={'20px'} />}

                                    </UserImgContainer>

                                    <ContentsInfo>
                                        <div>
                                            익명
                                        </div>
                                        <Timer time={article && article.date} />
                                    </ContentsInfo>
                                </UserWrapper>
                                <UpdateDeleteWrapper>
                                    {user === article.uid ? 
                                    <>
                                        <div onClick={() => setUpdateToggle(true)} >수정</div>
                                        <div onClick={() => deleteDoc()} >삭제</div>
                                    </>
                                    : null}
                                </UpdateDeleteWrapper>
                            </MainContentsUser>

                            <MainContents>
                                <MainContentsTitle>
                                    {article && article.title}
                                </MainContentsTitle>
                                <MainContentsContetns>
                                    <Article>
                                        {article && article.contents}
                                    </Article>
                                    <Image src={article.image}  />
                                </MainContentsContetns>
                            </MainContents>

                            <MainContentsFooter>
                                footer( 좋아요, 댓글 수, 즐겨찾기 수, 좋아요버튼, 즐겨찾기 버튼)
                            </MainContentsFooter>

                            <Comments />
                           

                            <MainContentsComment onSubmit={(e) => onSubmitComment(e)} >
                                <CommentInput placeholder='댓글을 입력하세요.' onChange={e => setComment(e.target.value)} value={comment} />
                                <CommentSubmitContainer>
                                    <CommentSubmit type={'submit'} value={"작성"} />
                                </CommentSubmitContainer>
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
