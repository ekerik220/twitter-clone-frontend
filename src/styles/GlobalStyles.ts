import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
* {
    box-sizing: border-box;
}

html, body, #root {
    height: 100%;
    margin: 0;
    padding: 0;
}

body {
    font-family: ${({ theme }) => theme.fontFamily}
}
`;
