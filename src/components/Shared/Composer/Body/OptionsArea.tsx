import React from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'

import { prepareSubmissionForPrepost } from '../../../../helpers/processLinks'

import { prepostItem } from '../../../../redux/prepost/actions'
import { PrepostItem } from '../../../../redux/prepost/types'

import { selectMenuState } from '../../../../redux/menu/selectors'
import { toggleMenu } from '../../../../redux/menu/actions'

import { isOpen } from '../../../../redux/composer/actions'

import { ReactComponent as Ellipsis } from '../../../../assets/menu-icon.svg'
import YouTube from '../../../../assets/youtube.png'
import Photo from '../../../../assets/photo.png'

import CustomInput from '../../CustomInput'

import Giphy from '../../Giphy'

type OptionsAreaProps = {
	setSubmission: any
	submission: string
}

type ChangeProps = {
	target: {
		value: string
	}
}

const ComposerBodyOptionsArea = ({
	submission,
	setSubmission,
}: OptionsAreaProps) => {
	const [placeholder, setPlaceholder] = React.useState('')

	const currentMenu = useSelector(selectMenuState)
	const dispatch = useDispatch()

	const photo = 'photoSubmission'
	const video = 'videoSubmission'
	const photoOpen = currentMenu && currentMenu === photo
	const videoOpen = currentMenu && currentMenu === video
	const isSubmitting = photoOpen || videoOpen

	const handleChange = ({ target: { value } }: ChangeProps) => {
		setSubmission(value)
	}

	const handleClick = (type: string) => {
		type && type === photo
			? setPlaceholder('Paste the photo link here...')
			: setPlaceholder('Paste the YouTube video link here...')

		currentMenu === type && dispatch(toggleMenu(''))
		currentMenu !== type && dispatch(toggleMenu(type))
	}

	const handleSubmission = async () => {
		if (!submission) return
		const result = await prepareSubmissionForPrepost(submission)
		result && dispatch(prepostItem(result as PrepostItem))
		setSubmission('')
		dispatch(toggleMenu(''))
		dispatch(isOpen(true))
	}

	React.useEffect(() => {
		handleSubmission()
	}, [submission])

	return (
		<StyledComposerBodyOptionsArea>
			{isSubmitting && (
				<div className="submission-field">
					<CustomInput
						type="text"
						value={submission}
						handleChange={handleChange}
						placeholder={placeholder}
					/>
				</div>
			)}
			<ul>
				<li onClick={() => handleClick(photo)}>
					<div className="option">
						<span className="option-icon">
							<img src={Photo} alt="Icon" />
						</span>
						<span className="option-text">Photo Link</span>
					</div>
				</li>
				<li onClick={() => handleClick(video)}>
					<div className="option">
						<span className="option-icon">
							<img src={YouTube} alt="Icon" />
						</span>
						<span className="option-text">Video Link</span>
					</div>
				</li>
				<li>
					<Giphy />
				</li>
				<li>
					<Ellipsis />
				</li>
			</ul>
		</StyledComposerBodyOptionsArea>
	)
}

const StyledComposerBodyOptionsArea = styled.div`
	border-top: 0.1rem solid var(--color-background);
	width: calc(100% - (var(--gap-outer) * 2));
	padding: var(--gap-outer) 0;
	margin: 0 var(--gap-outer);
	flex-direction: column;
	display: flex;

	.submission-field {
		input {
			width: 100%;
		}
	}

	ul {
		display: flex;
		width: 100%;

		li {
			background-color: var(--color-background-hover);
			justify-content: center;
			border-radius: 1.8rem;
			align-items: center;
			font-size: 1.3rem;
			font-weight: 600;
			cursor: pointer;
			height: 3.2rem;
			display: flex;

			.option {
				justify-content: center;
				align-items: center;
				display: flex;
				height: 100%;
				width: 100%;

				.option-icon {
					margin-right: 0.3rem;
					display: flex;

					img {
						height: 1.5rem;
					}
				}

				.option-text {
					text-overflow: ellipsis;
					white-space: nowrap;
					overflow: hidden;
				}
			}

			.more-menu {
				height: 100%;
			}

			svg {
				height: 2rem;
				width: 2rem;
			}

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
		}
	}
`

export default ComposerBodyOptionsArea
