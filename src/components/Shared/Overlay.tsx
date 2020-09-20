import React from 'react'
import styled from 'styled-components'

const Overlay = () => <StyledOverlay></StyledOverlay>

const StyledOverlay = styled.div`
	background-color: rgba(0, 0, 0, 0.4);
	position: fixed;
	z-index: 49;
	bottom: 0;
	right: 0;
	left: 0;
	top: 0;
`

export default Overlay
