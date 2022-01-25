import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import theme from './theme';


const Container = styled.nav`
    position: fixed;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    width: 100%;
    min-width: 1180px;
    height: 80px;
    border-bottom: 1px solid ${props => props.theme.line};
    box-shadow: 0 0.5px 1px rgba(25, 25, 25, 0.2);
    padding: 0 16px;
    background-color: white;
    z-index: 10;
    &>div {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 1180px;
        height: 80px;
    }
`
const MainLogo = styled(Link)`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 120px;
    &>p {
        display: flex; 
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        height: 38px;
        font-size: 22px;
        color: ${props => props.theme.color.first};
        margin-left: 8px;
    }
    &>p>span:first-child {
        font-size: 12px;
        font-weight: 500;
        color: ${props => props.theme.color.main};
    }
`
const Logo = styled.div`
    font-size: 48px;
`

const Menu = styled.ul`
    display: flex;



`
const Li = styled.li`
    margin-right: 22px;
        font-size: 16px;
        font-weight: 700;
        color: ${props => props.pathname === props.id ? props.theme.color.main : props.theme.color.first };
        display: flex;
        align-items: center;
        height:78px;
        box-sizing: content-box;
        border-bottom: 4px solid ${props => props.pathname === props.id ? props.theme.color.main : "tranparent" };
    &:first-child {
        border-bottom: 4px solid ${props => props.pathname.indexOf("board") > 0 ? props.theme.color.main : "tranparent" };
        color: ${props => props.pathname.indexOf("board") > 0 ? props.theme.color.main : "tranparent" };
    }
    &:hover {
        color: ${props => props.theme.color.main};
    }
    &:last-child {
        margin-right: 0px;
    }
`

const Account = styled.div`
    width: 120px;
    display: flex;
    justify-content: flex-end;
    padding-right: 16px;
    &>a:last-child{
        margin-left: 12px;
    }
`

function Header() {
    const location = useLocation()


  return (
    <Container>
        <div>
            <MainLogo to="/">
                <Logo>
                    {theme.mainLogo}
                </Logo>
                <p>
                    <span>
                        Classmate
                    </span>
                    <span >
                        순천대
                    </span>
                </p>
            </MainLogo>



            <Menu  >
                <Li id='/' pathname={location.pathname} ><Link to="/">게시판</Link></Li>
                <Li id='/time-table' pathname={location.pathname} ><Link to="time-table">시간표</Link></Li>
                <Li id='#' pathname={location.pathname}><Link to="#">강의평가</Link></Li>
                <Li id='#' pathname={location.pathname}><Link to="#">학점계산기</Link></Li>
                <Li id='#' pathname={location.pathname}><Link to="#">친구</Link></Li>
                <Li id="#" pathname={"1"} ><Link to="#">책방</Link></Li>
                <Li id='#' pathname={"2"} ><Link to="#">캠퍼스픽</Link></Li>
            </Menu>

            <Account >
                <a  >쪽지함</a>
                <a  >내 정보</a>
            </Account>
        </div>
    </Container>
  )
}

export default Header;
