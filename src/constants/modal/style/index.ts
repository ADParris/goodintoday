import { createGlobalStyle } from 'styled-components'

type ModalStyleProps = {
	screenTop: number
}

export default createGlobalStyle<ModalStyleProps>`
  html {
    body {
        top: -${props => props.screenTop}rem;
        overflow-y: scroll;
        position: fixed;
        height: 100vh;
        width: 100%;
    }
  }
`
