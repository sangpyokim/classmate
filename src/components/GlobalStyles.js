import {reset} from 'styled-reset'
import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
    ${reset}
    * {
        box-sizing: border-box;
        font-family: --apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        -ms-user-select: none; 
        -moz-user-select: -moz-none; 
        -webkit-user-select: none; 
        -khtml-user-select: none; 
        user-select:none;
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