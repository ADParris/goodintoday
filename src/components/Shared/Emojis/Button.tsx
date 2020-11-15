import React from 'react'
import styled from 'styled-components'

import EmojiIcon from './assets/emoji.png'

const EmojiButton = () => (
	<StyledEmojiButton>
		<span className="emoji-icon">
			<img src={EmojiIcon} alt="Emoji Icon" />
		</span>
	</StyledEmojiButton>
)

const StyledEmojiButton = styled.div`
	align-items: center;
	display: flex;

	.more-menu .menu-button {
		align-items: flex-end;
	}

	.emoji-icon {
		align-items: flex-end;
		display: flex;

		img {
			height: 2.4rem;
		}
	}
`

export default EmojiButton
