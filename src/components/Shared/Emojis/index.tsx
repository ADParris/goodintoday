import React from 'react'
import styled from 'styled-components'

import { BaseEmoji, Picker } from 'emoji-mart'
import 'emoji-mart/css/emoji-mart.css'

import MoreMenu from '../MoreMenu'

import EmojiIcon from './Button'

const Emojis = ({ id, onEmoji }: any) => {
	const handleSelection = (emoji: BaseEmoji) => onEmoji(emoji.native)

	return (
		<StyledEmojis>
			<MoreMenu id={`emojis-${id}`} MenuIcon={EmojiIcon} top={4}>
				<Picker
					set="facebook"
					showPreview={false}
					showSkinTones={false}
					onSelect={handleSelection}
				/>
			</MoreMenu>
		</StyledEmojis>
	)
}

const StyledEmojis = styled.div`
	.menu-frame-outer {
		.menu-frame-inner {
			ul {
				display: inherit;

				li {
					padding: inherit;

					button {
						padding: var(--gap-inner);
						outline: none;
					}

					&:hover {
						background: none;
					}
				}
			}
		}
	}
`

export default Emojis
