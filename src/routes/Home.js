import React, { useEffect, useState } from 'react'
import { signOut, updateCurrentUser } from 'firebase/auth'
import { Auth } from '../firebase'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import SubMenu from '../components/SubMenu'
import SearchInput from '../components/SearchInput'
import {BiSearch} from 'react-icons/bi'


const Ppp = styled.div`
    white-space: pre-wrap;
`
const Container = styled.div`
    width: 100%;
    height: 200vh;
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
        padding-left: 12px;
        display: flex;
        align-items: center;
        border-bottom: 1px solid ${props => props.theme.line};
        color: ${props => props.theme.color.second};
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

// 검색, 요약
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
`
const RightCard = styled.div`
    border: 1px solid ${props => props.theme.line};
    width: 100%;
    font-weight: 500;
    border-bottom: none;
    background-color: whitesmoke;
    margin-bottom: 4px;
    &>div {
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

function Home() {
    const [ data, setData ] = useState("")
    const user = useSelector( state => state.user.value)

    useEffect(() => {

    }, [])

    return (
        <Container>
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
                                닉네임
                            </Nickname>
                            <Name>
                                이름
                            </Name>
                            <Ident>
                                아이디
                            </Ident>
                            <AvatarButton>
                                <div>
                                    내정보
                                </div>
                                <div>
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
                            <div>자유게시판</div>
                            <div>게시글1</div>
                            <div>게시글2</div>
                            <div>게시글3</div>
                            <div>게시글4</div>
                        </MainCard>
                        <MainCard>
                            <div>비밀게시판</div>
                            <div>게시글1</div>
                            <div>게시글2</div>
                        </MainCard>
                    </MainSection>

                    <RightAside>
                        <InputContainer>
                            <SearchInput placeholder={"전체 게시판의 글을 검색하세요!"} />
                            <FormInputIcon />
                        </InputContainer>
                        
                        <RightCard>
                            <div>실시간 인기 글</div>
                            <div>실시간 인기 글1</div>
                            <div>실시간 인기 글2</div>
                        </RightCard>

                        <RightCard>
                            <div>HOT 게시물</div>
                            <div>실시간 인기 글1</div>
                            <div>실시간 인기 글2</div>
                        </RightCard>

                        <RightCard>
                            <div>BEST 게시판</div>
                        </RightCard>
                    </RightAside>

                </Contents>
            </ContentContainer>

            

        </Container>
    )
}

export default Home
