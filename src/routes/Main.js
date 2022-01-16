import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Logoo = "🇰🇷"


const Container = styled.div`
    display: flex;
    width:100%;
    flex-direction: column;
    @media ${props => props.theme.tablet} {
        padding-right: 301px;
    }
    
`
// 모바일헤더
const MobileHeader = styled.div`
    width: 100%;
    height: 49px;
    border-bottom: 1px solid ${props => props.theme.line};
    padding: 10px;
    display: flex;
    align-items:center;
    justify-content: space-between;

@media ${props => props.theme.tablet} {
    display: none;
}
`
const MobileLogo = styled.div`
    font-size: 30px;
`
const MobileButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 8px;
    height: 28px;
    border-radius: 3px;
    background-color: ${props => props.theme.color.main};
    float: right;
    font-size: ${props => props.theme.size.십이};
    color: white;
`
// 오른쪽 사이드바
const Aside = styled.div`
    position: fixed;
    width: 300px;
    right: 0;
    top: 0;
    border-left: 1px solid ${props => props.theme.line};
    overflow-y: auto;
    z-index: 9;
    height: 100vh;
    //스크롤바 삭제
    -ms-overflow-style: none; /* IE and Edge */
        scrollbar-width: none; /* Firefox */
    &::-webkit-scrollbar {
        display: none; /* Chrome, Safari, Opera*/
    }

@media ${ props => props.theme.mobile } {
    display: none;
}
`
//헤더
const Header = styled.div`
    padding: 40px 12px;
    border-bottom: 1px solid  ${props => props.theme.line};
    height: 270px;
    position: fixed;
    width: 300px;
    background-color: white;
    z-index: 10;
`
const Logo = styled.div`
    font-size: 30px;
    margin-bottom: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
`
const SignIn = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    border: 1px solid ${props => props.theme.line};
    color: ${props => props.theme.color.third};
    font-weight: 600;
    margin-bottom: 5px;
`
const SignUp = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    border: 1px solid ${props => props.theme.line};
    color: white;
    background-color: ${props=> props.theme.color.main};
    font-weight: 600;
    margin-bottom: 10px;
`
const FindPassword = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: auto;
    height: 15px;
    margin: 0 5px;
    color: ${props => props.theme.color.second};
    font-size: ${props => props.theme.size.십이};
`
//검색창
const Form = styled.form`
    height: 91px;
    padding: 5px;
    border-bottom: 1px solid ${props => props.theme.line};
    position: fixed;
    top: 270px;
    width: 300px;
    background-color: white;
    z-index: 10;
`
const FormLabel = styled.p`
    color: ${props => props.theme.color.first};
    font-weight: bold;
    padding: 10px;
    height: 40px;
`
const FormInput = styled.input`
    padding: 0 35px 0 10px;
    height: 40px;
    background-color: #f2f2f2;
    border: 1px solid #e3e3e3;
    color: ${props => props.theme.color.second};
    width: 100%;
`
//학교리스트
const Lists = styled.div`
    position: relative;
    top: 361px;
    z-index: 9;
`
const List = styled(Link)`
    padding: 0 15px;
    height: 49px;
    border-bottom: 1px solid ${props => props.theme.line};
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: white;
    &:hover {
        background-color: #f2f2f2;

    }
`
//메인
const MainSection = styled.div`
    background-color: #F5F5F5;
    width: 100%;
    height: 542px;
    display: flex;
        align-items: center;
        justify-content: center;

    @media ${ props => props.theme.tablet } {
        height: 622px;
    }
    @media ${ props => props.theme.desktop } {
        height: 662px;
    }
`
const ServiceSection = styled.div`
    height: 494px;
    display: flex;
        align-items: center;
        justify-content: center;

    @media ${ props => props.theme.tablet } {
        height: 509px;
    }
    @media ${ props => props.theme.desktop } {
        height: 585px;
    }
`
const CommunitySection = styled.div`
    height: 356px;
    background-color: #F5F5F5;
    display: flex;
        align-items: center;
        justify-content: center;

    @media ${ props => props.theme.tablet } {
        height: 491px;
    }
    @media ${ props => props.theme.desktop } {
        height: 642px;
    }
`
const Footer = styled.div`
    height: 52px;
    display: flex;
        align-items: center;
        justify-content: center;
`
// 모바일 웹
const MContainer = styled.div`
    width: 100%;
    height: 100vh;
`
const MLogin = styled.div`
    position: fixed;
    top:0;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 255px;
    padding: 30px 15px;
    z-index: 9;
`
const MLogo = styled(Link)`
    font-size: 60px;
    margin-bottom: 15px;
`
const MSignInButton = styled(Link)`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    border: 1px solid ${props => props.theme.line};
    width: 100%;
    margin-bottom: 5px;
`

const MSignUpButton = styled(Link)`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    background-color: ${props => props.theme.color.main};
    color: white;
    width: 100%;
    margin-bottom: 10px;
`
const MFindButton = styled(Link)`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    height: 15px;
    font-size: 12px;
`
const MLists = styled.div``
const MFooter = styled.div``

function Main() {
    const [ mobileToggle, setMobileToggle ] = useState(false);
    const [size, setSize] = useState(0);


    function updateSize() {
        setSize(window.innerWidth);
    }
    useLayoutEffect(() => {
        window.addEventListener('resize', updateSize)
        updateSize()
    }, [])

    
    

    if (size < 991 && mobileToggle ) {
        return(
            <MContainer  >
                <MLogin>
                    <MLogo to='#' onClick={() => setMobileToggle(false)} >
                        <div>{Logoo}</div>
                    </MLogo>
                    <MSignInButton to="#">로그인</MSignInButton>
                    <MSignUpButton to="#">회원가입</MSignUpButton>
                    <MFindButton to="#">아이디/비밀번호 찾기</MFindButton>
                </MLogin>
                <MLists></MLists>
                <MFooter></MFooter>
            </MContainer>
        )
    }

    return (
        <Container>
            <MobileHeader>
                <MobileLogo>{Logoo}</MobileLogo>
                <Link to="#" onClick={() => setMobileToggle(true)} >
                    <MobileButton>
                        모바일 웹 이용하기
                    </MobileButton>
                </Link>
            </MobileHeader>

            <Aside>
                <Header>
                    <Link to="/" >
                        <Logo>{Logoo}</Logo>
                    </Link>

                    <Link to="/" >
                        <SignIn>로그인</SignIn>
                    </Link>

                    <Link to="/" >
                        <SignUp>classmate 회원가입</SignUp>
                    </Link>

                    <Link to="/">
                        <FindPassword>아이디/비밀번호 찾기</FindPassword>
                    </Link>
                </Header>

                <Form autoComplete='off' >
                    <FormLabel>나중에 여기에 뭘 넣어야함? 일단 계속함</FormLabel>
                    <FormInput type="text" name="name" placeholder="찾으시는 캠퍼스를 검색하세요." autocomplete="off"></FormInput>
                </Form> 

                <Lists>
                    <List to='/'>
                        <div>대학이름</div>
                        <div>가입한사람수</div>
                    </List>
                    <List to='/'>
                        <div>대학이름</div>
                        <div>가입한사람수</div>
                    </List>
                    <List to='/'>
                        <div>대학이름</div>
                        <div>가입한사람수</div>
                    </List>
                    <List to='/'>
                        <div>대학이름</div>
                        <div>가입한사람수</div>
                    </List>
                    <List to='/'>
                        <div>대학이름</div>
                        <div>가입한사람수</div>
                    </List>
                    <List to='/'>
                        <div>대학이름</div>
                        <div>가입한사람수</div>
                    </List>
                    <List to='/'>
                        <div>대학이름</div>
                        <div>가입한사람수</div>
                    </List>
                    <List to='/'>
                        <div>대학이름</div>
                        <div>가입한사람수</div>
                    </List>
                    <List to='/'>
                        <div>대학이름</div>
                        <div>가입한사람수</div>
                    </List>
                    <List to='/'>
                        <div>대학이름</div>
                        <div>가입한사람수</div>
                    </List>
                    <List to='/'>
                        <div>대학이름</div>
                        <div>가입한사람수</div>
                    </List>
                    <List to='/'>
                        <div>대학이름</div>
                        <div>가입한사람수</div>
                    </List>
                    <List to='/'>
                        <div>대학이름</div>
                        <div>가입한사람수</div>
                    </List>
                    <List to='/'>
                        <div>대학이름</div>
                        <div>가입한사람수</div>
                    </List>
                    <List to='/'>
                        <div>대학이름</div>
                        <div>가입한사람수</div>
                    </List>
                    <List to='/'>
                        <div>대학이름</div>
                        <div>가입한사람수</div>
                    </List>
                    <List to='/'>
                        <div>대학이름</div>
                        <div>가입한사람수</div>
                    </List>
                    <List to='/'>
                        <div>대학이름</div>
                        <div>가입한사람수</div>
                    </List>
                    <List to='/'>
                        <div>대학이름</div>
                        <div>가입한사람수</div>
                    </List>
                    <List to='/'>
                        <div>대학이름</div>
                        <div>가입한사람수</div>
                    </List>
                    <List to='/'>
                        <div>대학이름</div>
                        <div>가입한사람수</div>
                    </List>
                    <List to='/'>
                        <div>대학이름</div>
                        <div>가입한사람수</div>
                    </List>
                    <List to='/'>
                        <div>대학이름</div>
                        <div>가입한사람수</div>
                    </List>
                    <List to='/'>
                        <div>대학이름</div>
                        <div>가입한사람수</div>
                    </List>
                    <List to='/'>
                        <div>대학이름</div>
                        <div>가입한사람수</div>
                    </List>
                </Lists>
            </Aside>

            <MainSection>
                main
            </MainSection>
            <ServiceSection>service</ServiceSection>
            <CommunitySection>community</CommunitySection>
            <Footer>footer</Footer>
        </Container>
    )
}

export default Main
