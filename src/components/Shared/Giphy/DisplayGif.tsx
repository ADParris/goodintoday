import React from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'

import { prepostItem } from '../../../redux/prepost/actions'
import { isOpen } from '../../../redux/composer/actions'
import { toggleMenu } from '../../../redux/menu/actions'
import { PostGif } from '../../../redux/posts/types'

interface Props extends PostGif {
	postId: string
}

const DisplayGif = ({ image, link, postId, site, title }: Props) => {
	const dispatch = useDispatch()

	const handleClick = () => {
		dispatch(
			prepostItem(postId, {
				gif: { image, link, site, title },
			} as any)
		)
		dispatch(toggleMenu(''))
		dispatch(isOpen(true))
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
