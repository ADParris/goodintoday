import React from 'react'
import styled from 'styled-components'

import { Picker } from 'emoji-mart'
import 'emoji-mart/css/emoji-mart.css'

import MoreMenu from '../MoreMenu'

import EmojiIcon from './Button'

const Emojis = ({ addEmoji }: any) => {
	return (
		<StyledEmojis>
			<MoreMenu id="emojis" MenuIcon={EmojiIcon} top={4}>
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

const StyledEmojis = styled.div``

export default Emojis
