import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

import { selectUser } from '../../redux/user/selectors'

import Group from './Sections/Group'

type SingleGroup = {
	items: [
		{
			icon: string
			internal: boolean
			link: string
			name: string
		}
	]
	title?: string
}

type LeftColumnProps = {
	groups: SingleGroup[]
}

const LeftColumn = ({ groups }: LeftColumnProps) => {
	const user = useSelector(selectUser)
	const userData = user && {
		items: [
			{
				icon: user.image,
				internal: true,
				link: user.profile,
				name: user.name.full,
			},
		],
	}

	return (
		<StyledLeftColumn>
			<Group {...userData} />
			{groups.map((group: SingleGroup, index: number) => (
				<Group key={index} {...group} />
			))}
		</StyledLeftColumn>
	)
}

const StyledLeftColumn = styled.aside`
	max-width: 18rem;
`

// TODO: Unify State and prepare for offsite data.
LeftColumn.defaultProps = {
	groups: [
		{
			items: [
				{
					icon:
						'https://scontent-lax3-1.xx.fbcdn.net/v/t39.2081-6/c4.4.37.37a/p40x40/26477732_5082148895180525_4133107059698696192_n.png?_nc_cat=1&_nc_sid=eaa83b&_nc_ohc=tg9XB6JWg6cAX_VqlsN&_nc_ht=scontent-lax3-1.xx&oh=d095517f5ac15042b52507df012d6ff8&oe=5F9DCB6D',
					internal: false,
					link:
						'https://apps.facebook.com/farmville-two/?fb_source=bookmark&ref=bookmarks&count=4&fb_bmpos=_4',
					name: 'Farmville 2',
				},
			],
			title: 'Games',
		},
	],
}

export default LeftColumn
