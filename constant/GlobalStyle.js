import { createGlobalStyle } from "styled-components";
export const GlobalStyle = createGlobalStyle`
  html {
    scroll-behavior: smooth;
  }
 body {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    background-color: #faf8ef;
  }
  ul {
    list-style: none;
  }
  
  a {
    text-decoration: none;
    display: flex;
  
    &:hover {
      text-decoration: none;
    }
  }
  
  a:hover {
    cursor: pointer;
  }
  `;
