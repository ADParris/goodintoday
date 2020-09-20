import React from 'react'
import styled from 'styled-components'

import withUserData, { DisplayUser } from '../../HOCs/withUserData'

import Group from './Sections/Group'

type SingleGroup = {
	items: [
		{
			icon: string
			link: string
			title: string
		}
	]
	title?: string
}

interface LeftColumnProps extends DisplayUser {
	groups: SingleGroup[]
}

const LeftColumn = ({ image, name, profile, groups }: LeftColumnProps) => {
	const userData = {
		items: [
			{
				icon: image!,
				link: profile!,
				title: name!.full!,
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
						'https://scontent-lax3-1.xx.fbcdn.net/v/t39.2081-6/c4.4.37.37a/p40x40/69318413_10157521098363777_892913165283622912_n.png?_nc_cat=1&_nc_sid=eaa83b&_nc_ohc=D5rbOs4Zm88AX95i6A6&_nc_ht=scontent-lax3-1.xx&oh=7feca2172bed2cdeb9a419beafa87c5c&oe=5F745327',
					link:
						'https://apps.facebook.com/onthefarm/?fb_source=bookmark&ref=bookmarks&count=9&fb_bmpos=_9',
					title: 'Farmville',
				},
				{
					icon:
						'https://scontent-lax3-1.xx.fbcdn.net/v/t39.2081-6/c4.4.37.37a/p40x40/26477732_5082148895180525_4133107059698696192_n.png?_nc_cat=1&_nc_sid=eaa83b&_nc_ohc=pD7ACowY_iUAX8vyW6r&_nc_ht=scontent-lax3-1.xx&oh=3aac1f99dacdd64cf4b371360d51e827&oe=5F763E6D',
					link:
						'https://apps.facebook.com/farmville-two/?fb_source=bookmark&ref=bookmarks&count=4&fb_bmpos=_4',
					title: 'Farmville 2',
				},
			],
			title: 'Games',
		},
	],
}

export default withUserData<DisplayUser>(LeftColumn as any)