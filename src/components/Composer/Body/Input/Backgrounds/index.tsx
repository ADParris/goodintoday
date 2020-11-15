import React from 'react'
import styled from 'styled-components'

import { useDispatch } from 'react-redux'
import EditorActions from '../../../../../redux/editor/actions'

import BackgroundsIcon from './Button'

interface StyleProps {
	background: string
}

const Backgrounds = () => {
	const { setBackground } = new EditorActions()
	const dispatch = useDispatch()

	// Component state...
	const [isOpen, setIsOpen] = React.useState(false)
	const [selected, setSelected] = React.useState('#ebedf0')
	const backgrounds = [
		'#C600FF',
		'#57AA6F',
		'#F5C33E',
		'#4362B5',
		'#F5723C',
		'#C23C30',
		'#FFAA96',
		'#8AD3E6',
		'#FF3F58',
		'#F47387',
	]

	const handleClick = () => setIsOpen(!isOpen)

	const handleReset = () => {
		dispatch(setBackground(''))
		setSelected('#ebedf0')
	}

	const handleBgClick = (background: string) => {
		dispatch(setBackground(background))
		setSelected(background)
	}

	return (
		<StyledBackgrounds>
			<li className="bg-li">
				<button onClick={handleClick}>
					{isOpen ? (
						<span className="backgrounds-close">&#60;</span>
					) : (
						<BackgroundsIcon />
					)}
				</button>
			</li>
			{isOpen && (
				<li key="reset" className="bg-li">
					<StyledSpan
						className={`${selected === '#ebedf0' ? 'selected' : null}`}
						background="#ebedf0"
						onClick={handleReset}
					></StyledSpan>
				</li>
			)}
			{isOpen &&
				backgrounds.map(background => {
					return (
						<li key={background} className="bg-li">
							<StyledSpan
								className={`${selected === background ? 'selected' : null}`}
								background={background}
								onClick={() => handleBgClick(background)}
							></StyledSpan>
						</li>
					)
				})}
		</StyledBackgrounds>
	)
}

const StyledBackgrounds = styled.ul`
	display: flex;
	height: 100%;
	width: 100%;

	.bg-li {
		min-height: 2rem;
		min-width: 2rem;
		margin: 0.4rem;

		button {
			background: none;
			min-height: 100%;
			min-width: 100%;
			display: flex;
			outline: none;
			border: none;

			.backgrounds-close {
				box-shadow: 0 0 0.4rem 0 rgba(0, 0, 0, 0.15);
				background: rgba(0, 0, 0, 0.5);
				border: 0.1rem solid white;
				justify-content: center;
				border-radius: 0.4rem;
				align-items: center;
				font-size: 2rem;
				display: flex;
				color: white;
				height: 2rem;
				width: 2rem;

				&:active {
					box-shadow: inset 0 0 0 0.2rem #ffffff,
						0 0 0.4rem 0 rgba(0, 0, 0, 0.3);
				}
			}
		}
	}
`

const StyledSpan = styled.span`
	background: ${(props: StyleProps) => props.background};
	box-shadow: 0 0 0.4rem 0 rgba(0, 0, 0, 0.15);
	border-radius: 0.4rem;
	display: block;
	height: 100%;
	width: 100%;

	&.selected {
		box-shadow: inset 0 0 0 0.2rem #ffffff, 0 0 0.4rem 0 rgba(0, 0, 0, 0.3);
	}
`

export default Backgrounds
