import React from 'react'
import styled from 'styled-components'

import Utils from '../../../../helpers/utils'

import { PostUser } from '../../../../redux/posts/types'

interface ComponentProps {
	sorted: [{ [type: string]: PostUser[] }]
}

const ReactionsPopUpList = ({ sorted }: ComponentProps) => {
	const { capitalizeWord } = new Utils()

	const renderList = () => (
		<div>
			{sorted.map(item => {
				const type = Object.keys(item)[0]
				const user = Object.values(item)[0]
				return (
					<div className="reaction-group" key={type}>
						<h5 className="reaction-title">{capitalizeWord(type)}</h5>
						<ul className="reaction-list">
							{user.map((user, index) => (
								<li key={index}>{user.name}</li>
							))}
						</ul>
					</div>
				)
			})}
		</div>
	)
	return <StyledReactionsPopUpList>{renderList()}</StyledReactionsPopUpList>
}

const StyledReactionsPopUpList = styled.div`
	background-color: rgba(0, 0, 0, 0.8);
	padding: var(--gap-outer);
	border-radius: var(--border-radius);
	white-space: nowrap;
	position: absolute;
	bottom: 2.25rem;
	left: -1.2rem;
	color: #fff;

	.reaction-group {
		margin-bottom: var(--gap-inner);

		.reaction-title {
			margin-bottom: 0.4rem;
			font-size: 1.6rem;
			font-weight: bold;
		}

		.reaction-list {
			font-size: 1.4rem;
			li {
				margin-bottom: 0.2rem;
			}
		}
	}
`

export default ReactionsPopUpList
