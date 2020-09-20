import React from 'react'
import styled from 'styled-components'

interface ItemProps {
	item: {
		icon: string
		link: string
		title: string
	}
}

const Item = ({ item }: ItemProps) => {
	const { icon, link, title } = item
	return (
		<StyledItem>
			<a href={link} rel="noopener noreferrer" target="_blank">
				<img src={icon} alt={title} />
				<span>{title}</span>
			</a>
		</StyledItem>
	)
}

const StyledItem = styled.li`
	border: 0.1rem solid rgba(0, 0, 0, 0);
	border-radius: var(--radius-border);
	cursor: pointer;

	a {
		align-items: center;
		padding: var(--gap-inner);
		display: flex;
		img {
			margin-right: var(--gap-inner);
			height: 2rem;
		}
		span {
			color: var(--color-text-darker);
		}
	}

	&:hover {
		border: 0.1rem solid var(--color-border);
		background-color: var(--color-background-hover);
	}
`

export default Item
