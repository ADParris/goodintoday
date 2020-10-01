import React from 'react'
import styled from 'styled-components'

type TextDisplayProps = {
	text: string
	textProps: TextProps
}

interface TextProps {
	background: boolean
	other: boolean
}

const TextDisplay = ({ text, textProps }: TextDisplayProps) => (
	<StyledTextDisplay {...textProps}>
		<p>{text}</p>
	</StyledTextDisplay>
)

const StyledTextDisplay = styled.div`
	color: ${(props: TextProps) => (props.background ? 'white' : 'black')};
	line-height: ${(props: TextProps) => (props.other ? 'initial' : '1.2em')};

	padding: ${(props: TextProps) =>
		props.other || !props.background ? 'var(--gap-outer)' : '5rem 3rem'};

	text-align: ${(props: TextProps) =>
		props.other || !props.background ? 'initial' : 'center'};
	font-weight: ${(props: TextProps) =>
		props.other || !props.background ? 'initial' : 700};
	align-self: auto;
	font-size: ${(props: TextProps) => {
		if (!props.other && props.background) return '3rem'
		if (!props.other && !props.background) return '2.4rem'
		return '1.6rem'
	}};

	justify-content: center;
	flex-direction: column;
	align-items: center;
	display: ${(props: TextProps) =>
		props.other || !props.background ? 'inherit' : 'flex'};
	height: ${(props: TextProps) =>
		props.other && !props.background ? 'initial' : '100%'};
`

export default TextDisplay
