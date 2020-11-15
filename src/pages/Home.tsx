import React from 'react'
import styled from 'styled-components'

import { useDispatch, useSelector } from 'react-redux'
import SystemSelectors from '../redux/system/selectors'

import SystemActions from '../redux/system/actions'

import LeftColumn from '../layout/LeftColumn'
import MainColumn from '../layout/MainColumn'
import RightColumn from '../layout/RightColumn'

const Home = () => {
	const { setCurrentPage } = new SystemActions()
	const { selectCurrentPage } = new SystemSelectors()
	const dispatch = useDispatch()

	// Redux store...
	const page = useSelector(selectCurrentPage)

	// If current page is not set to home, set it...
	React.useEffect(() => {
		page !== 'home' && dispatch(setCurrentPage('home'))
	}, [dispatch, page, setCurrentPage])

	return (
		<StyledHome>
			<aside className="column column-left">
				<LeftColumn />
			</aside>
			<main className="column column-center">
				<MainColumn />
			</main>
			<aside className="column column-right">
				<RightColumn />
			</aside>
		</StyledHome>
	)
}

const StyledHome = styled.div`
	display: flex;

	.column {
		flex: 1 auto;
		width: 100%;

		&-center {
			max-width: 50rem;
		}

		&:not(:last-child) {
			margin-right: var(--gap-outer);
		}
	}
`

export default Home
