import React from 'react'
import styled from 'styled-components'

interface ComponentProps {
	component?: any
	handleClick: any
	icon?: string
	label?: string
}

const ComposerBodyOption = ({
	component,
	handleClick,
	icon,
	label,
}: ComponentProps) => {
	const renderOption = () =>
		component ? (
			component
		) : (
			<span className="option" onClick={() => handleClick(label)}>
				<span className="option-icon">
					<img src={icon} alt={label} />
				</span>
				<span className="option-label">{`${label} Link`}</span>
			</span>
		)

	return <StyledComposerBodyOption>{renderOption()}</StyledComposerBodyOption>
}

const StyledComposerBodyOption = styled.li`
	background-color: var(--color-background-hover);
	justify-content: center;
	border-radius: 1.8rem;
	align-items: center;
	font-size: 1.3rem;
	font-weight: 600;
	cursor: pointer;
	height: 3.2rem;
	display: flex;

	&:last-child {
		width: 4.4rem;
	}

	&:not(:last-child) {
		width: calc((100% - 4.4rem) / 3 - var(--gap-inner));
		margin-right: var(--gap-inner);
		padding: 0 1.5rem;
	}

	&:hover {
		background-color: var(--color-background);
	}

	.option {
		justify-content: center;
		align-items: center;
		display: flex;
		height: 100%;
		width: 100%;

		&-icon {
			margin-right: 0.3rem;
			display: flex;

			img {
				height: 1.5rem;
			}
		}
		&-label {
		}
	}
`

export default ComposerBodyOption
