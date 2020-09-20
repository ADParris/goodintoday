import React from 'react'
import styled from 'styled-components'

import GiphyIcon from '../../../assets/giphy-icon.png'

const GiphyButton = () => (
	<StyledGiphyButton>
		<span>
			<img src={GiphyIcon} alt="Giphy Logo" />
		</span>
		<span>GIF</span>
	</StyledGiphyButton>
)

const StyledGiphyButton = styled.div`
	align-items: center;
	display: flex;

	span {
		align-items: center;
		display: flex;

		img {
			margin-right: 0.3rem;
			height: 1.6rem;
		}
	}
`

export default GiphyButton
