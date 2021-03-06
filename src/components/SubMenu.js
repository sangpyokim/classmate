import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
    margin-top: 80px;
    height: 230px;
    display: flex;
    justify-content: center;
    padding: 12px;
    width: 100%;
    &>div {
        display: flex;
        flex-direction: column;
        align-items: center;
        border: 1px solid ${props => props.theme.line};
        border-bottom: none;
        border-top: none;
        width: 160px;
        padding: 12px;
    }
`
const BoardLink = styled(Link)`
        margin-bottom: 8px;
        font-size: 12px;
        color: ${props => props.pathname.split(props.id).length > 1 ? props.theme.color.main : props.theme.color.third };
        font-weight: ${props => props.pathname.split(props.id).length > 1 ? 700 : 600 };
        &:hover {
        color: ${props => props.theme.color.main};
        font-weight: 700;
    }

`


function SubMenu() {
  let location = useLocation()


  return (
      <div>
        <Container>
          <div>
              <BoardLink to='/free-board' id='free-board' pathname={location.pathname} >
                자유게시판
              </BoardLink >
              <BoardLink to='/secret-board' id='secret-board' pathname={location.pathname} >
                비밀게시판
              </BoardLink >
          </div>

        </Container>
      </div>


  )
}

export default SubMenu;
