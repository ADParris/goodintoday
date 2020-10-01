import React from 'react'
import styled from 'styled-components'
import { createPortal } from 'react-dom'
import { useSelector } from 'react-redux'

import { selectScreenTop } from '../../redux/modal/selectors'

const Overlay = ({ children }: any) => {
	const screenTop = useSelector(selectScreenTop)

	React.useEffect(() => {
		return () => window.scrollTo(0, screenTop * 10)
	}, [screenTop])

	return createPortal(
		<StyledOverlay>
			<StyledOverlayChild>{children}</StyledOverlayChild>
		</StyledOverlay>,
		document.getElementById('modal') as HTMLElement
	)
}

const StyledOverlay = styled.div`
	background-color: rgba(0, 0, 0, 0.4);
	position: fixed;
	z-index: 49;
	bottom: 0;
	right: 0;
	left: 0;
	top: 0;
`

const StyledOverlayChild = styled.div`
	margin: 14.4rem auto 0;
	position: absolute;
	min-height: 100%;
	height: auto;
	width: 50rem;
	z-index: 50;
	right: 0;
	left: 0;
	top: 0;
`

export default Overlay
