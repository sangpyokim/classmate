import React, { useEffect, useRef, useState } from 'react'
import { signOut } from 'firebase/auth'
import { Auth, FireStore } from '../firebase'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import SubMenu from '../components/SubMenu'
import { collection, collectionGroup, doc, getDoc, getDocs, limit, orderBy, query, where } from 'firebase/firestore'
import Loader from '../components/Loader'
import { useNavigate } from 'react-router-dom'
import Timer from '../components/Timer'
import Footer from '../components/Footer'
import FirebaseAPI from '../components/FirebaseAPI'
import RightAsides from '../components/RightAside'


const Container = styled.div`
    width: 100%;
    height: 100vh; 
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
const ContentsWrapper = styled.div`
    height: auto;
    min-height: 100%;
    margin-bottom: -75px;
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
// 내 정보
const LeftAside = styled.aside`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 175px;
    
`
const Avatar = styled.div`
    border: 1px solid ${props => props.theme.line};
    width: 100%;
    height: 210px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 16px 0;
    background-color: whitesmoke;
    margin-bottom:4px;
`
const UserImgContainer = styled.div``
const UserImg = styled.img`
    width: 60px;
    height: 60px;
    border-radius: 8px;
    margin: 12px 0;
`
const Nickname = styled.div`
    font-size: 18px;
    margin-bottom: 8px;
    font-weight: 700;
`
const Name = styled.div`
    font-size: 12px;
    margin-bottom: 4px;
    color: ${props => props.theme.color.third};
`
const Ident = styled.div`
    font-size: 12px;
    margin-bottom: 8px;
    color: ${props => props.theme.color.third};

`
const AvatarButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    &>div{
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid ${props => props.theme.line};
        border-radius: 2px;
        width: 68px;
        height: 26px;
        font-size: 12px;   
        color: ${props => props.theme.color.second}
    }
    &>div:hover {
        cursor: pointer;
        background-color: white;
    }
    &>div:first-child {
        margin-right: 4px;
    }
`
const Card = styled.div`
    border: 1px solid ${props => props.theme.line};
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    background-color: whitesmoke;
    &>div {
        width: 100%;
        height: 40px;
        padding-left: 12px;
        display: flex;
        align-items: center;
        border-bottom: 1px solid ${props => props.theme.line};
        color: ${props => props.theme.color.second};
    }
    &>div:hover {
        cursor: pointer;
        background-color: white;
    }
    &>div:last-child {
        border: none;
    }

`


// 게시판들
const MainSection = styled.div`
    display: flex;
    justify-content: center;
    &>div:first-child {
        margin-right: 4px;
    }
`
const MainCard = styled.div`
    height: fit-content;
    width: 300px;
    border: 1px solid ${props => props.theme.line};
    border-bottom: none;

    &>div {
        width: 100%;
        height: 40px;
        padding: 12px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid ${props => props.theme.line};
        color: ${props => props.theme.color.second};
    }
    &>div>div:last-child {
        font-size: 12px;
        color: ${props => props.theme.color.third};
    }
    &>div:hover {
        cursor: pointer;
        background-color: whitesmoke;
    }
    &>div:first-child:hover {
        background-color: white;
    }
    &>div:first-child {
        font-size: 14px;
        font-weight: 700;
        color: ${props => props.theme.color.main};
    }
    &:last-child>div:first-child{
        height: 40px;
    }
    &:last-child>div{
        height: 80px;
    }

`
const SecretCard = styled.div`
    height: fit-content;
    width: 300px;
    border: 1px solid ${props => props.theme.line};
    border-bottom: none;
`
const SecretCardTitle = styled.div`
    width: 100%;
    height: 40px;
    padding: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid ${props => props.theme.line};
    color: ${props => props.theme.color.main};
    font-size: 14px;
    font-weight: 700;
    &:hover {
        cursor: pointer;
    }
`
const ArticleContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 80px;
    border-bottom: 1px solid ${props => props.theme.line};
    padding:12px;
    padding-top: 16px;
    color: ${props => props.theme.color.second};

    &:hover {
        cursor: pointer;
        background-color: whitesmoke;    
    }
`
const Status = styled.div`
    display: flex;
    align-items: center;
    opacity: 0.9;

    &>div {
        margin-right: 4px;
        font-size: 12px;
        font-weight: 600;
        color: black;
    }
    &>div:first-child {
        font-size: 12px;
        color: ${props => props.theme.color.third};
        font-weight: 500;
        margin-right: 6px;
    }
`
const Heart = styled.div`
    display: flex;
    align-items: center;
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

function Home() {
    const [ userdata, setUserData ] = useState("")
    const [ loading, setLoading ] = useState(true);
    const [ freeList, setFreeList ] = useState([]);
    const [ secretList, setSecretList ] = useState([]) 
    
    let navigate = useNavigate()
    
    const user = useSelector( state => state.user.value)

    
    const isMounted = useRef(false)

    useEffect(() => {
        isMounted.current = true
        FirebaseAPI.getUserInfo(user, setUserData) 
        if (FirebaseAPI.readDocuments(user,'free-board', 4, setFreeList, isMounted) && FirebaseAPI.readDocuments(user, 'secret-board', 2, setSecretList, isMounted)) {
            setLoading(false)
        }
        return () => isMounted.current = false
    }, [])


    const logOut = () => {
        if(window.confirm("로그아웃 하시겠습니까?")){
            signOut(Auth)
        }
    }


    return (
        <>
        {loading 
        ? <Loader /> 
        :
        <Container>
            <ContentsWrapper>
            <SubMenuContainer>
                <SubMenu />
            </SubMenuContainer>
                <ContentContainer>
                    <Contents>
                        <LeftAside>
                            <Avatar>
                                <UserImgContainer>
                                    {userdata && userdata.image == null ? <UserImg height={60} width={60} src="https://firebasestorage.googleapis.com/v0/b/classmate-e.appspot.com/o/default_image.png?alt=media&token=c2ca3608-9fea-4021-82f7-bb5640bbbba9" /> : <UserImg height={60} width={60} src={userdata.image} />}
                                </UserImgContainer>
                                <Nickname>
                                    {userdata.nickname}
                                </Nickname>
                                <Name>
                                    {userdata.name}
                                </Name>
                                <Ident>
                                    {userdata.id}
                                </Ident>
                                <AvatarButton>
                                    <div onClick={() => navigate('/my')} >
                                        내정보
                                    </div>
                                    <div onClick={() => logOut()} >
                                        로그아웃
                                    </div>
                                </AvatarButton>
                            </Avatar>

                            <Card>
                                <div>내가 쓴 글</div>
                                <div>댓글 단 글</div>
                                <div onClick={() => navigate('/chat')} >쪽지함</div>
                            </Card>
                        </LeftAside>

                        <MainSection>
                            <MainCard>
                                <div onClick={() => navigate('/free-board')} >자유게시판</div>
                                {
                                    freeList && freeList[0] && freeList[0].map(article => (
                                <div key={article.id} onClick={() => navigate(`/free-board/${article.id}`, {state: {article}})} >
                                        <div>{article.title}</div>
                                        <Timer time={article.date} />
                                </div>
                                    ))
                                }
                            </MainCard>
                            <SecretCard>
                                <SecretCardTitle onClick={() => navigate('/secret-board')} >비밀게시판</SecretCardTitle>
                                {
                                secretList && secretList[0] && secretList[0].map(article => (
                                    <ArticleContainer key={article.id} onClick={() => navigate(`/secret-board/${article.id}`, {state: {article}})} >
                                        <div>{article.title}</div>
                                        <Status>
                                                <Timer time={article.date} />
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
                                    </ArticleContainer>
                                ))}
                            </SecretCard>
                        </MainSection>

                        
                        <RightAsides />
                    </Contents>
                </ContentContainer>

            </ContentsWrapper>
                <Footer />

        </Container>
        }
        </>

    )
}

export default Home
