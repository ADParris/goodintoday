import React from 'react'
import styled from 'styled-components'

import BackgroundsIcon from '../../../assets/backgrounds-icon.png'

const BackgroundsButton = () => (
	<StyledBackgroundsButton>
		<span className="backgrounds-icon">
			<img src={BackgroundsIcon} alt="Backgrounds Icon" />
		</span>
	</StyledBackgroundsButton>
)

const StyledBackgroundsButton = styled.div`
	align-items: center;
	display: flex;

	.more-menu .menu-button {
		align-items: flex-end;
	}

	.backgrounds-icon {
		align-items: flex-end;
		display: flex;

		img {
			height: 2rem;
		}
	}
`

export default BackgroundsButton
