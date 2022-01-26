import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 10;
`

function Loader() {
    return (
        <Container>
            Loading . . .
        </Container>
    )
}

export default Loader