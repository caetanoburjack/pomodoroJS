//HOW TO CREATE A GLOBAL STYLE
//FIRST YOU NEED TO IMPORT THE FUNCTION createGlobalStyle FROM styled-components
//SO, YOU NEED TO EXPORT A CONST WITH AN INSTANCE OF CREATEGLOBALSTYLE 
//RETAINING ALL CSS PROPERTIES
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
body {
    background: ${props => props.theme['gray-900']};
    color: #fff;
}
body, input, textarea, button {
    font-family: 'Roboto', sans-serif;
    font-size: 1rem;
    font-weight: 400;
}
`;