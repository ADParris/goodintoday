import React from 'react'
import styled from 'styled-components'

import { useDispatch } from 'react-redux'
import SystemActions from '../../../redux/system/actions'

import { PostGif } from '../../../redux/posts/types'

interface ComponentProps {
	onGif: Function
	gif: PostGif
}

const DisplayGif = ({ onGif, gif }: ComponentProps) => {
	const { setCurrentMenu } = new SystemActions()
	const dispatch = useDispatch()

	const { image, title } = gif as PostGif

	const handleClick = () => {
		onGif({ gif: gif })
		dispatch(setCurrentMenu(''))
	}

	return (
		<StyledDisplayGif onClick={handleClick}>
			<img src={image} alt={title} />
		</StyledDisplayGif>
	)
}

const StyledDisplayGif = styled.div`
	margin-bottom: var(--gap-inner);
	cursor: pointer;

	img {
		width: 26.2rem;
	}
`

export default DisplayGif
