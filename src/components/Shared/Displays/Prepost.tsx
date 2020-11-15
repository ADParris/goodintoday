import React from 'react'
import styled from 'styled-components'

import { useDispatch, useSelector } from 'react-redux'
import EditorSelectors from '../../../redux/editor/selectors'
import EditorActions from '../../../redux/editor/actions'

import GifDisplay from './Gif'
import ImageDisplay from './Image'
import VideoDisplay from './Video'

import { Prepost } from '../../../redux/editor/types'

interface ComponentProps {
	id: string
}

const PrepostDisplay = ({ id }: ComponentProps) => {
	const { selectPrepost } = new EditorSelectors()
	const { setPrepost } = new EditorActions()
	const dispatch = useDispatch()

	// Redux store...
	let prepost: Prepost | undefined | null = useSelector(selectPrepost)

	// Component handlers...
	const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		e.stopPropagation()
		return dispatch(setPrepost(undefined))
	}

	prepost = prepost && prepost.id === id ? prepost : null

	return (
		<StyledComposerBodyPrepost>
			{prepost && prepost.id && (
				<div className="prepost-cancel" onClick={handleClick}>
					<span>X</span>
				</div>
			)}
			{prepost && prepost.gif && Object.keys(prepost.gif).length !== 0 && (
				<GifDisplay {...(prepost.gif as any)} />
			)}
			{prepost && prepost.image && (
				<ImageDisplay src={prepost.image} alt="Submitted" />
			)}
			{prepost && prepost.video && Object.keys(prepost.video).length !== 0 && (
				<VideoDisplay {...(prepost.video as any)} />
			)}
		</StyledComposerBodyPrepost>
	)
}

const StyledComposerBodyPrepost = styled.div`
	position: relative;

	.prepost-cancel {
		background: rgba(0, 0, 0, 0.4);
		padding: var(--gap-inner);
		margin: var(--gap-inner);
		justify-content: center;
		align-items: center;
		position: absolute;
		border-radius: 50%;
		cursor: pointer;
		color: white;
		height: 2.4rem;
		width: 2.4rem;
		display: flex;
		z-index: 1;
		right: 0;
		top: 0;

		span {
			justify-content: center;
			align-items: center;
			font-size: 1.4rem;
			display: flex;
		}

		&:hover {
			background: rgba(0, 0, 0, 0.6);
		}
	}
`

export default PrepostDisplay
