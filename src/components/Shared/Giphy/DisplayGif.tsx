import React from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'

import { prepostItem } from '../../../redux/prepost/actions'
import { isOpen } from '../../../redux/composer/actions'
import { toggleMenu } from '../../../redux/menu/actions'
import { PostGif } from '../../../redux/posts/types'

const DisplayGif = ({ link, source, title }: PostGif) => {
	const dispatch = useDispatch()

	const handleClick = () => {
		dispatch(
			prepostItem({
				gif: { link, source, title },
			})
		)
		dispatch(toggleMenu(''))
		dispatch(isOpen(true))
	}

	return (
		<StyledDisplayGif onClick={handleClick}>
			<img src={link!} alt={title!} />
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
