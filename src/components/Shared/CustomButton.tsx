import React, { ComponentProps, ReactChild } from 'react'
import styled from 'styled-components'

type CustomButtonProps = {
	children: ReactChild
	inverted?: boolean
	isGoogleSignIn?: boolean
	otherProps?: ComponentProps<typeof Object>
	type?: any
	onClick?: any
}

type StyledButtonProps = {
	inverted?: boolean
	googleButton?: boolean
}

const CustomButton = ({
	children,
	inverted,
	isGoogleSignIn,
	...otherProps
}: CustomButtonProps) => (
	<StyledCustomButton
		inverted={inverted}
		googleButton={isGoogleSignIn}
		{...otherProps}
	>
		{children}
	</StyledCustomButton>
)

const StyledCustomButton = styled.button`
	border: ${(props: StyledButtonProps) =>
		props.inverted ? `0.1rem solid black` : `none`};

	color: ${props => (props.inverted ? `black` : `white`)};

	background-color: ${(props: StyledButtonProps) => {
		if (props.googleButton) {
			return `#4285f4`
		} else if (props.inverted) {
			return `white`
		} else {
			return `black`
		}
	}};

	font-family: 'Open Sans Condensed';
	text-transform: uppercase;
	justify-content: center;
	letter-spacing: 0.05rem;
	font-weight: bolder;
	min-width: 16.5rem;
	line-height: 5rem;
	padding: 0 3.5rem;
	font-size: 1.5rem;
	cursor: pointer;
	display: flex;
	height: 5rem;
	width: auto;

	&:hover {
		background-color: ${(props: StyledButtonProps) => {
			if (props.googleButton) {
				return `#357ae8`
			} else if (props.inverted) {
				return `black`
			} else {
				return `white`
			}
		}};

		border: ${(props: StyledButtonProps) =>
			props.googleButton || props.inverted ? `none` : `0.1rem solid black`};
		color: ${(props: StyledButtonProps) =>
			props.googleButton || props.inverted ? `white` : `black`};
	}
`

export default CustomButton
