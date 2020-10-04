import React from 'react'
import styled from 'styled-components'

import { Picker } from 'emoji-mart'
import 'emoji-mart/css/emoji-mart.css'

import MoreMenu from '../MoreMenu'

import EmojiIcon from './Button'

const Emojis = ({ addEmoji, id }: any) => {
	return (
		<StyledEmojis>
			<MoreMenu id={id} MenuIcon={EmojiIcon} top={4}>
				<Picker
					set="facebook"
					showPreview={false}
					showSkinTones={false}
					onSelect={addEmoji}
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
