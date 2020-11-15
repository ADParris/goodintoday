import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  *::before, *, *::after {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  html {
    font-size: 62.5%;
    height: 100%;

    body {
      background-color: var(--color-background);
      font-family: Helvetica, Arial, sans-serif;
      color: var(--color-text-darker);
      font-size: 1.6rem;
      height: 100%;

      textarea {
        font-family: inherit;
      }

      input {
        outline: none;
		    border: none;
      }

      ul {
        list-style: none;

        li {
          text-align: -webkit-match-parent;
        }
      }

      a {
        text-decoration: none;
        color: inherit;
      }

      #root {
        height: 100%;
      }
    }
  }
`
