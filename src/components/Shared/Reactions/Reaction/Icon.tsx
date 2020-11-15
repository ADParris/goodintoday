import React from 'react'
import styled from 'styled-components'

import Utils from '../../../../helpers/utils'

import source from '../assets'

interface ComponentProps extends StyleProps {
	type: string
}

interface StyleProps {
	size: number
}

const ReactionIcon = ({ size, type }: ComponentProps) => {
	const { capitalizeWord } = new Utils()
	const src = source[type as keyof typeof source]
	const alt = `${capitalizeWord(type)} Icon`

	return (
		<StyledReactionIcon size={size}>
			<img src={src} alt={alt} />
		</StyledReactionIcon>
	)
}

const StyledReactionIcon = styled.div`
	display: inline-block;
	line-height: 0;

	img {
		height: ${(props: StyleProps) => props.size}rem;
		width: ${(props: StyleProps) => props.size}rem;
	}
`

export default ReactionIcon
