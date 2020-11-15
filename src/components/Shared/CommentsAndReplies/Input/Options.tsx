import React from 'react'
import styled from 'styled-components'

import Emojis from '../../Emojis'
import Giphy from '../../Giphy'

import { PostGif } from '../../../../redux/posts/types'
import { EditorActionTypes } from '../../../../redux/editor/types'

interface ComponentProps {
	handleEmoji: (emoji: string) => void
	handleGif: (gif: PostGif) => EditorActionTypes
	id: string
}

const InputOptions = ({ handleEmoji, handleGif, id }: ComponentProps) => {
	return (
		<StyledCommentInputOptions>
			<li className="comment-input-option">
				<Emojis onEmoji={handleEmoji} id={id} />
			</li>
			<li className="comment-input-option">
				<Giphy from="comment" id={id} onGif={handleGif} />
			</li>
		</StyledCommentInputOptions>
	)
}

const StyledCommentInputOptions = styled.ul`
	margin-left: -0.8rem;
	margin-right: 0.8rem;
	align-self: flex-end;
	flex-direction: row;
	height: 3.2rem;
	display: flex;

	.comment-input-option {
		align-items: center;
		cursor: pointer;
		display: flex;
	}
`

export default InputOptions
