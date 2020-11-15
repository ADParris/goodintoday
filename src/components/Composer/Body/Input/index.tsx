import React from 'react'
import styled from 'styled-components'

import { EditorState } from 'draft-js'

import { useDispatch, useSelector } from 'react-redux'
import EditorSelectors from '../../../../redux/editor/selectors'
import EditorActions from '../../../../redux/editor/actions'

import Utils from '../../../../helpers/utils'

import UserDisplay from '../../../Shared/Displays/User'
import DraftInput from '../../../Shared/DraftInput'

import Backgrounds from './Backgrounds'
import Emojis from '../../../Shared/Emojis'

interface ComponentProps {
	componentId: string
	editorState: EditorState
	setEditorState: React.Dispatch<React.SetStateAction<EditorState>>
}

interface StyleProps {
	background?: string | null
}

const ComposerBodyInput = ({
	componentId,
	editorState,
	setEditorState,
}: ComponentProps) => {
	const {
		selectBackground,
		selectId,
		selectIsEditing,
		selectHasPrepost,
	} = new EditorSelectors()
	const { setId } = new EditorActions()
	const { addEmoji, addFocus } = new Utils()

	const dispatch = useDispatch()

	// Redux store...
	let background = useSelector(selectBackground)
	const editorId = useSelector(selectId)
	const hasPrepost = useSelector(selectHasPrepost)
	const isEditing = useSelector(selectIsEditing)

	const isActive = componentId === editorId
	const showUser = background || isEditing
	background = componentId === 'composer' && isEditing ? undefined : background

	// Component handlers...
	const handleClick = () => !isActive && dispatch(setId(componentId))

	const handleEmoji = (emoji: string) => {
		const insert = addEmoji({ editorState, emoji })
		setEditorState(insert)
	}

	// Observer...
	const editorRef = React.useRef<HTMLDivElement>(null)
	const setFocus = () => editorRef.current && editorRef.current.focus()
	componentId === 'composer' &&
		addFocus({
			toBeWatched: componentId,
			watchingFor: `wrap-options`,
			setFocus,
		})

	return (
		<StyledComposerBodyInput background={background}>
			<div className="wrap">
				{!showUser && <UserDisplay size={4} />}
				<div className="wrap-editor" onClick={handleClick} ref={editorRef}>
					<DraftInput
						background={background}
						editorState={editorState}
						editorType="composer"
						setEditorState={setEditorState}
					/>
				</div>
			</div>
			{isActive && (
				<div className="wrap-options">
					<ul className="options">
						<li className="option">{!hasPrepost && <Backgrounds />}</li>
						<li className="option">
							<Emojis id="composer" onEmoji={handleEmoji} />
						</li>
					</ul>
				</div>
			)}
		</StyledComposerBodyInput>
	)
}

const StyledComposerBodyInput = styled.div`
	.wrap {
		display: flex;

		&-user {
			margin: var(--gap-outer) 0 0 var(--gap-outer);
			justify-content: flex-start;
			align-items: flex-start;
			display: flex;
		}

		&-editor {
			width: ${(props: StyleProps) =>
				props.background ? '100%' : 'calc(100% - 5.2rem)'};
			cursor: text;
			height: 100%;
		}

		&-options {
			.options {
				justify-content: space-between;
				margin: 0 var(--gap-outer);
				align-items: center;
				padding: 0.2rem;
				display: flex;
			}
		}
	}
`

export default ComposerBodyInput
