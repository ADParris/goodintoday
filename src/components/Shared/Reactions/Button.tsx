import React from 'react'
import styled from 'styled-components'

import Utils from '../../../helpers/utils'

import source from './assets'

interface ComponentProps {
	handleClick: any
	reactionType?: string
	showImage: boolean
}

export default ({ handleClick, reactionType, showImage }: ComponentProps) => {
	const { capitalizeWord } = new Utils()

	const btnText = reactionType ? capitalizeWord(reactionType) : 'Like'
	const btnImage = reactionType ? reactionType : 'default'
	const btnClass = reactionType ? reactionType : ''

	return (
		<StyledReactionsButton
			className="reactions-button"
			onClick={() => handleClick(reactionType)}
		>
			{showImage && (
				<img
					className={btnClass}
					src={source[btnImage as keyof typeof source]}
					alt={`${btnText} Icon`}
				/>
			)}
			<span className={btnClass}>{btnText}</span>
		</StyledReactionsButton>
	)
}

const StyledReactionsButton = styled.span`
	img,
	span {
		&.like {
			color: rgb(32, 120, 244);
		}

		&.love {
			color: rgb(243, 62, 88);
		}

		&.care,
		&.haha,
		&.wow,
		&.sad {
			color: rgb(247, 177, 37);
		}

		&.angry {
			color: rgb(233, 113, 15);
		}
	}
`
