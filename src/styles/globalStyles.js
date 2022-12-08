import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap');
 *,
 *::after,
 *::before {
   margin: 0;
   padding: 0;
   box-sizing: border-box;
  }
  body, html {
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    height: 100%;
    font-size: 16px;
    font-family: ${({ theme }) => theme.fontFamily};
    -webkit-font-smoothing: antialiased;
  }
  body {
    background-color: ${({ theme }) => theme.backgroundColor.primary};
    color: ${({ theme }) => theme.neutralColor.textPrimary};
    margin: 0;
  }
  a{
    color: ${({ theme }) => theme.accentColor.primary};
    text-decoration: none;
  }
  a:hover{
    color: ${({ theme }) => theme.accentColor.secondary};
  }
  h1, h2, h3, h4, h5, h6{
    margin: 10px 0;
    line-height: 120%;
    color: ${({ theme }) => theme.neutralColor.textPrimary};
  }
  p{
    font-size: 1rem;
    margin: 0;
    line-height: 140%;
    font-family: ${({ theme }) => theme.fontFamily};
    color: ${({ theme }) => theme.neutralColor.textPrimary};
  }
  ul{
    list-style: none;
    padding: 0;
    font-size: 0.875rem;
    line-height: 130%;
  }
  button{
    background-color: transparent;
  }
  img{
    width:100%;
  }
  .react-confirm-alert-overlay{
    background-color: rgba(63, 63, 63, .3);
  }

  `;

export default GlobalStyles;
