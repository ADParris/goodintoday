import React from 'react'
import styled from 'styled-components'

import { useDispatch, useSelector } from 'react-redux'
import SystemSelectors from '../redux/system/selectors'

import SystemActions from '../redux/system/actions'

import Hero from '../components/Profile/Hero'
import InfoColumn from '../components/Profile/InfoColumn'
import MainColumn from '../layout/MainColumn'

interface StyleProps {
	page: string
}

const Profile = () => {
	const { setCurrentPage } = new SystemActions()
	const { selectCurrentPage } = new SystemSelectors()
	const dispatch = useDispatch()

	// Redux store...
	const page = useSelector(selectCurrentPage)

	// If current page is not set to profile, set it...
	React.useEffect(() => {
		page !== 'profile' && dispatch(setCurrentPage('profile'))
	}, [dispatch, page, setCurrentPage])

	return (
		<StyledProfile>
			<Hero />
			<div className="main">
				<InfoColumn />
				<MainColumn />
			</div>
		</StyledProfile>
	)
}

const StyledProfile = styled.div`
	flex-direction: column;
	max-width: 85.1rem;
	margin: 0 auto;
	display: flex;

	.main {
		display: flex;
	}
`

export default Profile
