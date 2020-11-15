import React from 'react'
import styled from 'styled-components'

import Utils from '../../../../helpers/utils'

import ReactionIcon from './Icon'

interface ComponentProps {
	handleClick: (type: string) => void
	type: string
}

const Reaction = ({ handleClick, type }: ComponentProps) => {
	const { capitalizeWord } = new Utils()

	return (
		<StyledReaction onClick={() => handleClick(type)}>
			<div className="reaction">
				<ReactionIcon size={3.9} type={type} />
				<div className="reaction-text">
					<div className="reaction-text-inner">{capitalizeWord(type)}</div>
				</div>
			</div>
		</StyledReaction>
	)
}

const StyledReaction = styled.span`
	transform: scale(1, 1) translateY(0.0001px);
	animation-timing-function: linear;
	animation-iteration-count: 1;
	backface-visibility: hidden;
	transform-origin: 50% 100%;

	display: inline-block;
	position: relative;
	cursor: pointer;
	height: 4.8rem;
	width: 4.8rem;
	z-index: 2;
	margin: 0;

	.reaction {
		transform: scale(1) translate(0, 0);
		transition: transform 200ms ease;

		display: inline-block;
		position: relative;
		line-height: 0;
		left: 0.5rem;
		top: 0.5rem;

		.reaction-text {
			transform: translate(-50%, 4px) scale(0.8125);
			position: absolute;
			text-align: center;
			top: -2.8rem;
			left: 50%;
		}

		.reaction-text-inner {
			background-color: rgba(0, 0, 0, 0.8);
			transition: opacity 50ms ease;
			text-overflow: ellipsis;
			display: inline-block;
			text-decoration: none;
			border-radius: 1rem;
			padding: 0 0.8rem;
			user-select: none;
			font-size: 1.2rem;
			font-weight: bold;
			line-height: 2rem;
			max-width: 100%;
			color: #ffffff;
			opacity: 0;
		}

		&:hover {
			transform: scale(1.23077) translate(0, -0.4rem);
		}
	}

	&:hover {
		.reaction-text-inner {
			opacity: 1;
		}
	}
`

export default Reaction
