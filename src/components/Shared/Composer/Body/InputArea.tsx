import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

import { selectComposerIsOpen } from '../../../../redux/composer/selectors'

import { EmojiData } from 'emoji-mart'

import Backgrounds from '../../Backgrounds'
import Emojis from '../../Emojis'

type InputAreaProps = {
	background: string
	setBackground: any
	handleFocus: any
	handleTextChange: any
	image?: string
	name?: {
		first?: string
		full?: string
	}
	postText?: string
}

type StyleProps = {
	background: string
	composerIsOpen: boolean
}

const ComposerBodyInputArea = ({
	background,
	setBackground,
	handleFocus,
	handleTextChange,
	image,
	name,
	postText,
}: InputAreaProps) => {
	const [composerWasOpen, setComposerWasOpen] = React.useState(false)
	const composerIsOpen = useSelector(selectComposerIsOpen)
	composerIsOpen && !composerWasOpen && setComposerWasOpen(true)

	React.useEffect(() => {
		if (composerWasOpen && !composerIsOpen) {
			setBackground('transparent')
			handleTextChange({ target: { value: '' } })
			setComposerWasOpen(false)
		}
	}, [composerIsOpen, composerWasOpen, handleTextChange, setBackground])

	const addEmoji = (emoji: EmojiData) => {
		if ('native' in emoji) {
			handleTextChange({ target: { value: `${postText}${emoji.native}` } })
		}
	}

	const handleBgChange = (background: string) => setBackground(background)

	return (
		<StyledComposerBodyInputArea
			composerIsOpen={composerIsOpen}
			background={background}
		>
			<div className="textarea-wrapper">
				{background === 'transparent' && (
					<div className="image-container">
						<img className="image-user" src={image} alt={name && name.full} />
					</div>
				)}
				<textarea
					placeholder={`What's on your mind, ${name && name.first}?`}
					onChange={handleTextChange}
					onFocus={handleFocus}
					value={postText}
				></textarea>
			</div>
			{composerIsOpen && (
				<div className="post-options">
					<div className="post-options-backgrounds">
						<Backgrounds setBackground={handleBgChange} />
					</div>
					<div className="post-options-emojis">
						<Emojis addEmoji={addEmoji} />
					</div>
				</div>
			)}
		</StyledComposerBodyInputArea>
	)
}

const StyledComposerBodyInputArea = styled.div`
	background: ${(props: StyleProps) =>
		props.background !== 'transparent' ? props.background : 'transparent'};
	height: 100%;
	width: 100%;

	.textarea-wrapper {
		height: ${(props: StyleProps) =>
			props.background !== 'transparent' ? '27rem' : '100%'};
		align-items: center;
		display: flex;
		.image-container {
			padding: var(--gap-outer);
			.image-user {
				height: 4rem;
			}
		}
		textarea {
			font-size: ${(props: StyleProps) => {
				if (props.background !== 'transparent' && props.composerIsOpen)
					return '3rem'
				if (props.background === 'transparent' && props.composerIsOpen)
					return '2.4rem'
				return '1.8rem'
			}};
			font-weight: ${(props: StyleProps) =>
				props.background !== 'transparent' ? 700 : 'inherit'};
			text-align: ${(props: StyleProps) =>
				props.background !== 'transparent' ? 'center' : 'initial'};
			color: ${(props: StyleProps) =>
				props.background !== 'transparent' ? 'white' : 'black'};
			::placeholder {
				color: ${(props: StyleProps) =>
					props.background !== 'transparent' ? 'white' : 'black'};
				opacity: 0.8;
			}
			transition: font-size 0.2s ease-in-out;
			padding: 1.8rem 1.2rem 1.4rem 1.2rem;
			background-color: transparent;
			line-height: 2.8rem;
			min-height: initial;
			overflow: hidden;
			max-height: none;
			resize: none;
			width: 100%;
			outline: 0;
			border: 0;
		}
	}

	.post-options {
		justify-content: space-between;
		margin: 0 var(--gap-outer);
		align-items: center;
		padding: 0.2rem;
		display: flex;
		&-backgrounds {
			height: 2.6rem;
			width: 2.6rem;
		}
		&-emojis {
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
		}
	}
`

export default ComposerBodyInputArea
