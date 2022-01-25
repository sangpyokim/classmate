import {reset} from 'styled-reset'
import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
    ${reset}
    * {
        box-sizing: border-box;
        &:focus {
            outline: none;
        }
    }
    body {
        font-family: 'Source Sans Pro', sans-serif;
        background-color: white;
        color: black;
        font-size: 14px;
    }
    a {
        text-decoration:none;
        color:inherit;
    }
`

export default GlobalStyles