import React from 'react';
import styled from 'styled-components';
import RightAsides from '../components/RightAside';
import SubMenu from '../components/SubMenu';


const SubMenuContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-width: 1180px;
    background-color: whitesmoke;
    border-bottom: 1px solid ${props => props.theme.line};
`

function SecretBoard() {
  return (
    <div>
      <SubMenuContainer>
        <SubMenu />
      </SubMenuContainer>
      <RightAsides />
    </div>
  )
}

export default SecretBoard;
