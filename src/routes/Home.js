import React, { useEffect, useState } from 'react'
import { signOut, updateCurrentUser } from 'firebase/auth'
import { Auth, FireStore } from '../firebase'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import SubMenu from '../components/SubMenu'
import { collection, doc, getDoc, getDocs, limit, orderBy, query, where } from 'firebase/firestore'
import Loader from '../components/Loader'
import RightAsides from '../components/RightAside'
import { Link, useNavigate } from 'react-router-dom'
import Timer from '../components/Timer'
import Footer from '../components/Footer'


const Ppp = styled.div`
    white-space: pre-wrap;
`
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
const Picture = styled.div`
    font-size: 64px;
    margin-top: 8px;
    margin-bottom: 8px;
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


function Home() {
    const [ userdata, setUserData ] = useState("")
    const [ loading, setLoading ] = useState(true);
    const [ freeList, setFreeList ] = useState();


    const user = useSelector( state => state.user.value)

    let navigate = useNavigate()

    const getUserInfo = async () => {
        const docRef = doc(FireStore, "Users_Info", user);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setUserData(docSnap.data());
            setLoading(false);
          } else {
            // doc.data() will be undefined in this case
            alert("잘못된 접근!");
          }

    }
    // 자유게시판 최신 4개 가져오기! 
    const getFreeBoardList = async() => {
        const q = query(collection(FireStore, 'Sunchon', 'Free_board', '1'),orderBy('id', 'desc'), where('shown', '==', true),limit(4))
        const querySnapshot = await getDocs(q)
        const list = []
        querySnapshot.forEach(doc => {
            list.push(doc.data())
        })
        setFreeList(list)
    }

    useEffect(() => {
        getUserInfo()
        getFreeBoardList()
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
                                <Picture>
                                    ♥
                                </Picture>
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
                                    <div>
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
                                <div>즐겨찾기</div>
                            </Card>
                        </LeftAside>

                        <MainSection>
                            <MainCard>
                                <div onClick={() => navigate('/free-board')} >자유게시판</div>
                                {
                                    freeList && freeList.map(article => (
                                <div key={article.id} onClick={() => navigate(`/free-board/${article.id}`, {state: {article}})} >
                                        <div>{article.title}</div>
                                        <Timer time={article.date} />
                                </div>
                                    ))
                                }
                            </MainCard>
                            <MainCard>
                                <div onClick={() => navigate('/secret-board')} >비밀게시판</div>
                                <div>댓글 구현할 때 만들게용!</div>
                                <div>게시글2</div>
                            </MainCard>
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
