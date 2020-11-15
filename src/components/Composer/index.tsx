import React from 'react'
import styled from 'styled-components'

import { EditorState } from 'draft-js'

import { useDispatch, useSelector } from 'react-redux'
import SystemActions from '../../redux/system/actions'
import EditorActions from '../../redux/editor/actions'
import EditorSelectors from '../../redux/editor/selectors'

import Posting from '../../helpers/posting'

import Head from './Head'
import Body from './Body'
import Foot from './Foot'

const Composer = () => {
	const componentId = 'composer'

	const { setCurrentMenu } = new SystemActions()
	const { selectId, selectIsEditing } = new EditorSelectors()
	const { reset } = new EditorActions()
	const posting = new Posting()

	const dispatch = useDispatch()

	// Component state...
	const [editorState, setEditorState] = React.useState(() =>
		EditorState.createEmpty()
	)

	// Redux store...
	const editorId = useSelector(selectId)
	const isEditing = useSelector(selectIsEditing)

	const isActive = componentId === editorId && !isEditing

	// Component handlers...
	const handleCancel = () => {
		dispatch(reset())
		dispatch(setCurrentMenu(''))
	}

	const handleSubmit = () => {
		const text = editorState.getCurrentContent().getPlainText()
		posting.create({ text })
		const resetEditorState = posting.utils.resetEditor(editorState)
		setEditorState(resetEditorState)
		dispatch(reset())
	}

	return (
		<StyledComposer id={componentId}>
			<Head handleCancel={handleCancel} isActive={isActive} />
			<Body
				componentId={componentId}
				editorState={editorState}
				setEditorState={setEditorState}
			/>
			{isActive && <Foot handleSubmit={handleSubmit} />}
		</StyledComposer>
	)
}

const StyledComposer = styled.div`
	background-color: var(--color-background);
	margin-bottom: var(--gap-outer);
	border-color: transparent;
	border-right-width: 0;
	border-left-width: 0;
	position: relative;

	&::before {
		border: 0.1rem solid var(--color-border);
		border-radius: var(--border-radius);
		pointer-events: none;
		position: absolute;
		bottom: -0.1rem;
		right: -0.1rem;
		left: -0.1rem;
		top: -0.1rem;
		content: '';
	}
`

export default Composer
