import { createGlobalStyle } from 'styled-components';


const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Noto Sans KR', sans-serif;
  }
  body {
    margin: 0;
    padding: 0;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  ol, ul {
	  list-style: none;
  }
  button {
    all: unset;
    cursor: pointer;
  }
  input {
    border: none;
    outline: none;
  }
`;

export default GlobalStyle;