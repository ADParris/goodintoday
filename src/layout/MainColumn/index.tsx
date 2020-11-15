import React from 'react'
import styled from 'styled-components'

import { useSelector } from 'react-redux'
import SystemSelectors from '../../redux/system/selectors'

import Composer from '../../components/Composer'
import Feed from '../../components/Shared/Displays/Feed'

interface StyleProps {
	page: string
}

const MainFeed = () => {
	const { selectCurrentPage } = new SystemSelectors()

	const page = useSelector(selectCurrentPage)

	return (
		<StyledMainFeed page={page}>
			<Composer />
			<Feed />
		</StyledMainFeed>
	)
}

const StyledMainFeed = styled.ul`
	width: ${(props: StyleProps) =>
		props.page === 'home' ? 50 : props.page === 'profile' && 51.6}rem;
`

export default MainFeed
