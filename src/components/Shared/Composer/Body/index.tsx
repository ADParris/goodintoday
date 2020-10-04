import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

import { selectComposerIsOpen } from '../../../../redux/composer/selectors'

import InputArea from './InputArea'
import PreviewArea from '../../PreviewArea'
import OptionsArea from './OptionsArea'

interface ComposerBodyProps {
	background: string
	setBackground: any
	handleFocus: any
	handleTextChange: any
	image: string
	name?: {
		first?: string
		full?: string
	}
	postText?: string | null
	prepostData?: any
	setSubmission: any
	submission: string
}

interface IsOpen {
	isOpen: boolean
}

const ComposerBody = ({
	background,
	setBackground,
	handleFocus,
	handleTextChange,
	image,
	name,
	postText,
	prepostData,
	setSubmission,
	submission,
}: ComposerBodyProps) => {
	const composerIsOpen = useSelector(selectComposerIsOpen)

	return (
		<StyledComposerBody id="composer-body" isOpen={composerIsOpen}>
			<InputArea
				background={background}
				setBackground={setBackground}
				handleFocus={handleFocus}
				handleTextChange={handleTextChange}
				image={image}
				name={name}
				postText={postText}
			/>
			{prepostData && <PreviewArea prepostData={prepostData} />}
			<OptionsArea setSubmission={setSubmission} submission={submission} />
		</StyledComposerBody>
	)
}

const StyledComposerBody = styled.div`
	border-bottom-right-radius: ${(props: IsOpen) =>
		props.isOpen ? 'none' : 'var(--border-radius)'};
	border-bottom-left-radius: ${(props: IsOpen) =>
		props.isOpen ? 'none' : 'var(--border-radius)'};
	background-color: white;
	flex-direction: column;
	display: flex;
`

export default ComposerBody
