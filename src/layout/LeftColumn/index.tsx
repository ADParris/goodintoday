import React from 'react'
import styled from 'styled-components'

import { useSelector } from 'react-redux'
import SystemSelectors from '../../redux/system/selectors'

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

interface StyleProps {
	page: string
}

type LeftColumnProps = {
	groups: SingleGroup[]
}

const LeftColumn = ({ groups }: LeftColumnProps) => {
	const { selectCurrentPage, selectCurrentUser } = new SystemSelectors()

	// Redux store...
	const page = useSelector(selectCurrentPage)
	const user = useSelector(selectCurrentUser)

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
		<StyledLeftColumn page={page}>
			<Group {...userData} />
			{groups.map((group: SingleGroup, index: number) => (
				<Group key={index} {...group} />
			))}
		</StyledLeftColumn>
	)
}

const StyledLeftColumn = styled.aside`
	width: ${(props: StyleProps) =>
		props.page === 'home' ? 18 : props.page === 'profile' && 32.3}rem;
`

// TODO: Unify State and prepare for offsite data.
LeftColumn.defaultProps = {
	groups: [
		{
			items: [
				{
					icon:
						'https://scontent-lax3-1.xx.fbcdn.net/v/t39.2081-6/c4.4.37.37a/p40x40/26477732_5082148895180525_4133107059698696192_n.png?_nc_cat=1&ccb=2&_nc_sid=eaa83b&_nc_ohc=OpGb8Sa1-bcAX8gMjcn&_nc_ht=scontent-lax3-1.xx&oh=5fa862f9e0a1efe0ef573882da4b94c9&oe=5FC5586D',
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
