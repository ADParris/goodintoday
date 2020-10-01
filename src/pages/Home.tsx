import React from 'react'
import styled from 'styled-components'

import LeftColumn from '../components/LeftColumn'
import MainFeed from '../components/MainFeed'
import RightColumn from '../components/RightColumn'

const Home = () => (
	<StyledHome>
		<LeftColumn />
		<MainFeed width={500} from="feed" />
		<RightColumn />
	</StyledHome>
)

const StyledHome = styled.div`
	display: flex;
	> * {
		flex: 1 auto;
		width: 100%;

		&:not(:last-child) {
			margin-right: var(--gap-outer);
		}
	}
`

export default Home
