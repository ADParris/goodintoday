import React from 'react'
import styled from 'styled-components'

import Hero from '../components/Profile/Hero'
import InfoColumn from '../components/Profile/InfoColumn'
import MainFeed from '../components/MainFeed'

const Profile = () => (
	<StyledProfile>
		<Hero />
		<div className="main">
			<InfoColumn width={323} />
			<MainFeed width={516} from="profile" />
		</div>
	</StyledProfile>
)

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
