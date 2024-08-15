import { createGlobalStyle } from 'styled-components';


const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'SSRONETHandwritten';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2402_1@1.0/SSRONETHandwritten.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
}
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'SSRONETHandwritten';
    font-size: 16px;
  }
  body {
    margin: 0;
    padding: 0;
    color: #212121;
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