import React from 'react'
import styled from 'styled-components'

import { useDispatch, useSelector } from 'react-redux'
import SystemSelectors from '../../../../redux/system/selectors'
import EditorActions from '../../../../redux/editor/actions'
import SystemActions from '../../../../redux/system/actions'

import LinkActions from '../../../../helpers/links'
import Utils from '../../../../helpers/utils'

import { ReactComponent as Ellipsis } from '../../../../assets/menu-icon.svg'
import YouTube from '../assets/youtube.png'
import Photo from '../assets/photo.png'

import Giphy from '../../../Shared/Giphy'
import Option from './Option'

import { PostGif } from '../../../../redux/posts/types'

interface ChangeProps {
	target: { value: string }
}

interface ComponentProps {
	componentId: string
}

interface StyleProps {
	isSubmitting: boolean
}

const ComposerBodyOptions = ({ componentId }: ComponentProps) => {
	const { selectCurrentMenu } = new SystemSelectors()
	const { processSubmission } = new LinkActions()
	const { setCurrentMenu } = new SystemActions()
	const { setId, setPrepost } = new EditorActions()
	const { addFocus } = new Utils()
	const dispatch = useDispatch()

	// Component state...
	const [placeholder, setPlaceholder] = React.useState('')
	const [submission, setSubmission] = React.useState('')

	// Redux store...
	const currentMenu = useSelector(selectCurrentMenu)

	// Component constants...
	const isSubmitting =
		currentMenu && (currentMenu === 'Photo' || currentMenu === 'Video')

	const submissionRef = React.useRef<HTMLInputElement>(null)

	// Component handlers...
	const handleChange = ({ target: { value } }: ChangeProps) =>
		setSubmission(value)

	const handleClick = (type: string) => {
		type && type === 'Photo'
			? setPlaceholder('Paste the photo link here...')
			: setPlaceholder('Paste the YouTube video link here...')

		currentMenu === type &&
			dispatch(setCurrentMenu('')) &&
			dispatch(setId(undefined))
		currentMenu !== type && dispatch(setCurrentMenu(type))
	}

	const handleSubmission = React.useCallback(
		async (gif?: PostGif) => {
			const result = gif ? gif : await processSubmission(submission)
			result &&
				dispatch(setPrepost({ ...result, id: componentId })) &&
				dispatch(setId(componentId))
			setSubmission('')
			dispatch(setCurrentMenu(''))
		},
		[
			componentId,
			dispatch,
			processSubmission,
			setCurrentMenu,
			setId,
			setPrepost,
			submission,
		]
	)

	React.useEffect(() => {
		submission && handleSubmission()
	}, [handleSubmission, submission])

	const options = [
		{ icon: Photo, label: 'Photo' },
		{ icon: YouTube, label: 'Video' },
		{
			component: (
				<Giphy from="post" id={componentId} onGif={handleSubmission} />
			),
		},
		{ component: <Ellipsis /> },
	]

	// Observer...
	const setFocus = () => submissionRef.current && submissionRef.current.focus()
	isSubmitting &&
		addFocus({
			toBeWatched: componentId,
			watchingFor: `composer-body-submission`,
			setFocus,
		})

	return (
		<StyledComposerBodyOptions id={componentId} isSubmitting={!!isSubmitting}>
			<div className="composer-body-submission">
				<input
					onChange={handleChange}
					placeholder={placeholder}
					ref={submissionRef}
					type="text"
					value={submission}
				/>
			</div>
			<ul className="composer-body-options">
				{options.map((option, index) => (
					<Option handleClick={handleClick} key={index} {...option} />
				))}
			</ul>
		</StyledComposerBodyOptions>
	)
}

const StyledComposerBodyOptions = styled.div`
	border-top: 0.1rem solid var(--color-background);
	width: calc(100% - (var(--gap-outer) * 2));
	padding: var(--gap-outer) 0;
	margin: 0 var(--gap-outer);
	flex-direction: column;
	display: flex;

	.composer {
		&-body {
			&-submission {
				display: ${(props: StyleProps) =>
					props.isSubmitting ? 'block' : 'none'};
			}
			&-options {
				display: flex;
			}
		}
	}
`

export default ComposerBodyOptions
