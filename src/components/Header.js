import React from 'react';
import { Link } from 'react-router-dom';
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

    &>li {
        margin-right: 22px;
        font-size: 16px;
        font-weight: 600;
        color: ${props => props.theme.color.first}
    }
    &>li:last-child {
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



            <Menu>
                <li ><Link to="/">게시판</Link></li>
                <li><Link to="#">시간표</Link></li>
                <li><Link to="#">강의평가</Link></li>
                <li><Link to="#">학점계산기</Link></li>
                <li><Link to="#">친구</Link></li>
                <li><Link to="#">책방</Link></li>
                <li><Link to="#">캠퍼스픽</Link></li>
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
