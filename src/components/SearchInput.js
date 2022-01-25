import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'


const Input = styled.input`
    width: 100%;
    height:100%;
    border: 2px solid ${props => props.theme.color.forth};
    padding: 8px;
`

function SearchInput({placeholder}) {
    let navigate = useNavigate()



  return (
    <Input placeholder={placeholder} />
  )
}

export default SearchInput;
