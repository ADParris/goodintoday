import React from 'react'
import styled from 'styled-components'

interface Props {
	text: string
	textProps: TextProps
}

interface TextProps {
	background: boolean
	length: number
	other: boolean
}

type StyleProps = TextProps

const TextDisplay = ({ text, textProps }: Props) => {
	textProps.length = text.length

	return (
		<StyledTextDisplay {...textProps}>
			<p>{text}</p>
		</StyledTextDisplay>
	)
}

const StyledTextDisplay = styled.div`
	color: ${(props: StyleProps) => (props.background ? 'white' : 'black')};
	line-height: ${(props: StyleProps) => (props.other ? 'initial' : '1.2em')};

	padding: ${(props: StyleProps) =>
		props.other || !props.background ? 'var(--gap-outer)' : '5rem 3rem'};

	text-align: ${(props: StyleProps) =>
		props.other || !props.background ? 'initial' : 'center'};
	font-weight: ${(props: StyleProps) =>
		props.other || !props.background ? 'initial' : 700};
	align-self: auto;
	font-size: ${(props: StyleProps) => {
		if (!props.other && props.background && props.length <= 85) return '3rem'
		if (!props.other && !props.background && props.length <= 85) return '2.4rem'
		return '1.6rem'
	}};

	justify-content: center;
	flex-direction: column;
	align-items: center;
	display: ${(props: StyleProps) =>
		props.other || !props.background ? 'inherit' : 'flex'};
	height: ${(props: StyleProps) =>
		props.other && !props.background ? 'initial' : '100%'};

	p {
		word-break: break-word;
	}
`

export default TextDisplay
