import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { useSelector } from 'react-redux'
import SystemSelectors from '../../../redux/system/selectors'

import { PostUser } from '../../../redux/posts/types'
import { User } from '../../../redux/system/types'

interface ComponentProps extends StyleProps {
	name?: string
	user?: PostUser
}

interface StyleProps {
	size: number
}

let currentUser: User | undefined

const UserDisplay = ({ name, size, user }: ComponentProps) => {
	const { selectCurrentUser } = new SystemSelectors()

	// Redux store...
	currentUser = useSelector(selectCurrentUser)

	// If a user was not passed in we use current...
	const displayUser = user ? user : currentUser

	// Optional name inclusion next to the image...
	let showName: string | undefined = ''
	if (name) {
		showName =
			name === 'first'
				? currentUser && currentUser.name.first
				: name === 'full'
				? currentUser && currentUser.name.full
				: user && user.name
	}

	const profileLink = displayUser && displayUser.profile
	const imageSrc = displayUser && displayUser.image
	const imageAlt = currentUser
		? (currentUser.name.full as any)
		: displayUser && displayUser.name

	return (
		<StyledUserDisplay size={size}>
			<Link className="wrap-user" to={`/${profileLink}`}>
				<img src={imageSrc} alt={`Profile of ${imageAlt}`} />
				{showName && showName}
			</Link>
		</StyledUserDisplay>
	)
}

const StyledUserDisplay = styled.div`
	a {
		display: flex;

		img {
			height: ${(props: StyleProps) => props.size}rem;
			width: ${(props: StyleProps) => props.size}rem;
		}
	}
`

export { currentUser }
export default UserDisplay
