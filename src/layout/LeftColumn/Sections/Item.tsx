import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

interface ComponentProps {
	item: {
		icon: string
		internal: boolean
		link: string
		name: string
	}
}

const Item = ({ item }: ComponentProps) => {
	const { icon, internal, link, name } = item
	return (
		<StyledItem>
			{internal ? (
				<Link to={link}>
					<img src={icon} alt={name} />
					<span>{name}</span>
				</Link>
			) : (
				<a href={link} rel="noopener noreferrer" target="_blank">
					<img src={icon} alt={name} />
					<span>{name}</span>
				</a>
			)}
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
