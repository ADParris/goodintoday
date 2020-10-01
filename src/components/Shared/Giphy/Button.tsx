import React from 'react'
import styled from 'styled-components'

import GiphyIcon from '../../../assets/giphy-logo-spin.gif'

const GiphyButton = () => (
	<StyledGiphyButton>
		<span className="giphy-logo">
			<img src={GiphyIcon} alt="Giphy Logo" />
		</span>
		<span className="button-text">GIF</span>
	</StyledGiphyButton>
)

const StyledGiphyButton = styled.div`
	align-items: center;
	display: flex;

	.giphy-logo {
		margin-right: 0.3rem;
		align-items: center;
		display: flex;

		img {
			height: 2rem;
		}
	}

	.button-text {
		font-size: 1.3rem;
		font-weight: 600;
	}
`

export default GiphyButton
