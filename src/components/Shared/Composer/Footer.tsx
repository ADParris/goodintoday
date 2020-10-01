import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

import { selectComposerIsOpen } from '../../../redux/composer/selectors'

interface ComposerFooterProps {
	handleSubmit: any
}

type IsOpen = {
	isOpen: boolean
}

const ComposerFooter = ({ handleSubmit }: ComposerFooterProps) => {
	const composerIsOpen = useSelector(selectComposerIsOpen)
	return (
		<StyledComposerFooter isOpen={composerIsOpen}>
			<div className="button-wrapper">
				{composerIsOpen && <button onClick={handleSubmit}>Post</button>}
			</div>
		</StyledComposerFooter>
	)
}

const StyledComposerFooter = styled.div`
	background-color: var(--color-background);

	.button-wrapper {
		border-top: 0.1rem solid var(--color-background);
		justify-content: flex-end;
		align-items: center;
		padding: 0.8rem 0;
		margin: 0 1.2rem;
		display: ${(props: IsOpen) => (props.isOpen ? 'flex' : 'none')};

		button {
			transition: 200ms cubic-bezier(0.08, 0.52, 0.52, 1) background-color,
				200ms cubic-bezier(0.08, 0.52, 0.52, 1) box-shadow,
				200ms cubic-bezier(0.08, 0.52, 0.52, 1) transform;
			border: 0.1rem solid var(--color-button-default);
			background-color: var(--color-button-default);
			-webkit-font-smoothing: antialiased;
			border-radius: 0.4rem;
			padding: 0.5rem 1.5rem;
			font-size: 1.4rem;
			font-weight: bold;
			cursor: pointer;
			color: white;

			&:hover {
				background-color: var(--color-button-hovered);
			}
		}
	}
`

export default ComposerFooter
