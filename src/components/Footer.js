import React from 'react';
import styled from 'styled-components';

const Conatiner = styled.div`
  height: 75px;
  width: 100%;
  min-width: 1180px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  color: ${props => props.theme.color.third};
  white-space: pre;
`

function Footer() {
  return (
      <Conatiner>mark.k   © Classmate</Conatiner>
  )
}

export default Footer;
