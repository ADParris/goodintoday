import React from 'react'
import styled from 'styled-components'

import GifIcon from './assets/gif.png'

const CommentGiphyButton = () => (
	<StyledCommentGiphyButton>
		<span className="gif-icon">
			<img src={GifIcon} alt="Gif Icon" />
		</span>
	</StyledCommentGiphyButton>
)

const StyledCommentGiphyButton = styled.div`
	align-items: center;
	display: flex;

	.gif-icon {
		align-items: center;
		display: flex;

		img {
			height: 2rem;
		}
	}
`

export default CommentGiphyButton
