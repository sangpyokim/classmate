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
    height: 42px;
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
    &>div:first-child {
        display: flex;
        margin-bottom: 12px;
    }

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
const Heart = styled.div`
    display: flex;
    font-size: 10px;
    margin-left: 6px;
    margin-right: 12px;
    opacity: 0.9;
    &>div{
        font-size:12px;
        margin-left: 6px;
        font-weight: 600;
        color: ${props => props.theme.color.main};
    }
`
const ArticleComment = styled.div`
    display: flex;
    font-size:12px;
    opacity: 0.9;

    &>div{
        margin-left: 4px;
        font-weight: 600;

    }
`
const HeartUpButton = styled.div`
    display: flex;
    align-items: center;
    width: fit-content;
    padding: 6px;
    background-color: whitesmoke;
    border-radius: 4px;
    color: ${props => props.theme.color.third};
    font-weight: 600;
    font-size: 10px;
    &>div {
        margin-left: 4px;
        font-size: 12px;
    }
`
const ArticleImage = styled.div`
    display: flex;
    font-size: 10px;
    margin-right: 4px;
    &>div {
        margin-left: 4px;
        font-size: 12px;
        color: #29ae74;
        font-weight: 600;
    }
`



const Day = ['일요일', "월요일", "화요일", "수요일", '목요일', '금요일', '토요일' ]

function FreeBoardDetail() {
    const location = useLocation() // state 값 article
    const navigate = useNavigate()
    const params = useParams()
    const user = useSelector( state => state.user.value);

    const [ article, setArticle ] = useState()
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
        } else {
            setArticle(location.state == null ? null : location.state.article)
            getUserInfo()
            setLoading(false)
        }

    }, [location])

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
        if( comment.length === 0 ) {
            alert('한글자 이상 작성해주세요!')
            return null
        }
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

    const articleHeartUp = async(id) => {
        if( window.confirm("공감하시겠습니까?") ) {
            const commmentRef = doc(FireStore, 'Sunchon', 'Free_board', '1', params.id)
            const docRef = await getDoc(commmentRef)
            const heartData = docRef.data().heart
            if( heartData.every( heart => heart != id )) {
                heartData.push(id)
                await updateDoc(commmentRef, {
                    heart: heartData
                })
                alert('공감하였습니다.')
            }else {
                alert("이미 공감하셨습니다.")
            }
        }
    }

    const onClickHeartUp = async(id) => {
        if( window.confirm("공감하시겠습니까?") ) {
            const commmentRef = doc(FireStore, 'Sunchon', 'Free_board', '1', params.id)
            const aa = await getDoc(commmentRef)
            const commentData = aa.data().comment

            if ( commentData[id].heart.every((heart) => heart != user)) {
                commentData[id].heart.push(user)
                await updateDoc(commmentRef, {
                    comment: commentData
                })
                alert("공감하였습니다.")
            }else {
                alert("이미 공감하였습니다.")
            }

            
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
                                    <UserImgContainer>
                                        {userData && userData.image == null ? <UserImg src="https://firebasestorage.googleapis.com/v0/b/classmate-e.appspot.com/o/default_image.png?alt=media&token=c2ca3608-9fea-4021-82f7-bb5640bbbba9" /> : <UserImg src={article.image} width={'20px'} />}

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
                                <div>
                                    {article.image === null ? null : 
                                    <ArticleImage>
                                        🖼️
                                        <div>
                                            1
                                        </div>
                                    </ArticleImage>}
                                    <Heart>❤️{article && article.heart == null ? 0 : 
                                        <div>{article.heart.length}</div>}
                                    </Heart>

                                    <ArticleComment>
                                        🗨 {article && article.comment == null ? 0 : 
                                            <div>{article.comment.length}</div>}
                                    </ArticleComment>
                                </div>
                                <HeartUpButton>
                                 ❤️ <div onClick={() => articleHeartUp(user)} >
                                        공감하기
                                    </div>
                                </HeartUpButton>

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
