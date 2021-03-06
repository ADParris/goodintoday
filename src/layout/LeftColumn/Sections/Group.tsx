import React from 'react'
import styled from 'styled-components'

import Item from './Item'

interface Item {
	icon: string
	internal: boolean
	link: string
	name: string
}

interface ComponentProps {
	items?: Item[]
	title?: string
}

const Group = ({ items, title }: ComponentProps) => (
	<StyledGroup>
		{title ? <h4>{title}</h4> : null}
		<ul>
			{items?.map((item, index) => (
				<Item key={index} item={item} />
			))}
		</ul>
	</StyledGroup>
)

const StyledGroup = styled.div`
	padding-bottom: var(--gap-outer);

	h4 {
		color: var(--color-text-lighter);
		padding: var(--gap-inner) 0;
	}

	&:not(:first-child) {
		margin-top: var(--gap-outer);
	}
`

export default Group
