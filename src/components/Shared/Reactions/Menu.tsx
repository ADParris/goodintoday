import React from 'react'
import styled from 'styled-components'

import Reaction from './Reaction'

interface StyleProps {
	menuOffset: {
		left: number
		top: number
	}
}

interface ComponentProps extends StyleProps {
	handleClick: (type: string) => void
	resetSelection: () => void
}

export default ({
	handleClick,
	menuOffset,
	resetSelection,
}: ComponentProps) => {
	const reactions = ['like', 'love', 'care', 'haha', 'wow', 'sad', 'angry']

	return (
		<StyledReactionsMenu menuOffset={menuOffset}>
			<div className="container">
				<div className="reactions">
					<div className="reactions-list">
						{reactions.map(reaction => (
							<Reaction
								key={reaction}
								handleClick={handleClick}
								type={reaction}
							/>
						))}
					</div>
					<div className="reactions-background" />
				</div>
			</div>
		</StyledReactionsMenu>
	)
}

const StyledReactionsMenu = styled.div`
	position: absolute;
	opacity: 1;
	left: ${(props: StyleProps) => props.menuOffset.left}rem;
	top: ${(props: StyleProps) => props.menuOffset.top}rem;

	.container {
		.reactions {
			padding: 0.5rem 1rem;

			&-list {
				white-space: nowrap;
				text-align: left;
				padding: 0.2rem;
			}

			&-background {
				box-shadow: 0 0 0 0.1rem rgba(0, 0, 0, 0.08),
					0 0.2rem 0.2rem rgba(0, 0, 0, 0.15);
				transition: height 200ms ease;
				border-radius: 4rem;
				background: #ffffff;
				position: absolute;
				height: 5.2rem;
				bottom: 0.5rem;
				right: 1rem;
				left: 1rem;
			}
		}
	}
`
