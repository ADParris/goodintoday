import React from 'react'
import { useSelector } from 'react-redux'

import { selectCurrentUser } from '../redux/user/selectors'
import { UserState } from '../redux/user/types'

import defaultImage from '../assets/silhouette.png'

interface ImgProps extends React.ImgHTMLAttributes<HTMLImageElement> {
	src?: string
	alt?: string
}

export type UserDataProps = UserState | ImgProps

export interface DisplayUser extends UserState {
	image?: string
	name?: {
		first?: string
		full?: string
	}
	profile?: string
}

export default <P extends UserState>(
	WrappedComponent: React.ComponentType<P>
): React.FunctionComponent<P> => (props: P) => {
	const currentUser = useSelector(selectCurrentUser)

	const image =
		currentUser && currentUser.photoURL ? currentUser.photoURL : defaultImage

	const name = {
		first:
			currentUser &&
			currentUser.displayName &&
			currentUser.displayName.split(' ')[0],
		full: currentUser && currentUser.displayName,
	}

	const profile =
		currentUser && currentUser.profileLink ? currentUser.profileLink : ''

	const newProps = { image, name, profile }

	return <WrappedComponent {...props} {...newProps} />
}
